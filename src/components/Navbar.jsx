/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from '../redux/hook';
import { disconnect } from '../redux/features/auth/authSlice';
import { disconnectWallet, walletAddressResize } from '../utils/interact';
import { FaRegUser } from "react-icons/fa";
import { toast } from 'react-toastify';

const Navbar = () => {
	const loggedInInfo = useSelector((state) => state?.auth);
	const dispatch = useAppDispatch();
	const push = useNavigate();




	const handleDisconnect = () => {
		const { address, status } = disconnectWallet();
		dispatch(
			disconnect({
				wallet_address: loggedInInfo?.wallet_address,
				ref_code: loggedInInfo?.ref_code,
			})
		);
		
		
		push('/');
		toast.success("Disconnect Successful!");
	};
	return (
		<div className="container mx-auto navbar bg-base-100 sticky top-0 z-50 ">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/geminix-dience">Geminix Dience</Link>
						</li>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
					</ul>
				</div>
				<Link className="btn btn-ghost text-xl" to="/">
					daisyUI
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/geminix-dience">Geminix Dience</Link>
					</li>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end">
			{
				!loggedInInfo?.wallet_address ? (
					<Link className="btn btn-outline btn-success btn-xs sm:btn-sm md:btn-md" to="/login">
					Log In
				</Link>
				) : (
					<button className="btn btn-outline btn-error btn-xs sm:btn-sm md:btn-md" onClick={handleDisconnect}>
					{/* Log Out */}
					<FaRegUser /> {walletAddressResize(loggedInInfo?.wallet_address)}
				</button>
				)
			}
				
			</div>
		</div>
	);
};

export default Navbar;
