import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/interact';

const DashboardTable = () => {
	const [referredUsers, setReferredUsers] = useState([]);
	const loggedInInfo = useSelector((state) => state?.auth);

	useEffect(() => {
		// Create an async function for API call
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_BASE}/user/referred-user`,
					{
						params: {
							refer_code: loggedInInfo?.ref_code,
						},
					}
				);
				setReferredUsers(response.data);
			} catch (err) {
				console.error(err.message);
			} finally {
				console.log('API call completed');
			}
		};

		fetchData(); // Call API on component mount
	}, [loggedInInfo?.ref_code]);

	return (
		<div>
			<h2 className="text-2xl font-bold uppercase mb-4 text-dark text-center px-12 py-6">
				Referred Users
			</h2>
			<div className="overflow-x-auto">
				<table className="table max-w-[1024px] w-full mx-auto">
					{/* head */}
					<thead>
						<tr>
							<th>#</th>
							<th>Date</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{referredUsers?.data?.length > 0 ? (
							referredUsers.data.map((user, index) => (
								<tr key={user.id} className="hover:bg-base-300">
									<th>{index + 1}</th>
									<td>{formatDate(user.created_at)}</td>
									<td>{user.wallet_address}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="3" className="text-center py-4 text-red-500">
									No data available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default DashboardTable;
