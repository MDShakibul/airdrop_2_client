export const disconnectWallet = async () => {
	localStorage.removeItem('referCode');
	localStorage.removeItem('walletAddress');
	await window.ethereum.request({
		method: 'wallet_revokePermissions',
		params: [
			{
				eth_accounts: {},
			},
		],
	});
};

export const walletAddressResize = (address) => {
	return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const formatDate =(isoString) => {
  const date = new Date(isoString);
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  return date.toLocaleString('en-US', options);
}