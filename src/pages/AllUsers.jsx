import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../utils/interact';

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    	useEffect(() => {
		// Create an async function for API call
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_BASE}/user`);
				setAllUsers(response.data);
			} catch (err) {
				console.error(err.message);
			} finally {
				console.log('API call completed');
			}
		};

		fetchData(); 
	}, []);

   
    return (
        <div>
  <h2 className="text-2xl font-bold uppercase mb-4 text-dark text-center px-12 py-6">
    All Users
  </h2>
  <div className="overflow-x-auto">
    <table className="table max-w-[1024px] w-full mx-auto">
      {/* head */}
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Address</th>
          <th>Refer Code</th>
          <th>Refferd By</th>
        </tr>
      </thead>
      <tbody>
        {allUsers?.data?.length > 0 ? (
          allUsers.data.map((user, index) => (
            <tr key={user.id} className="hover:bg-base-300">
              <th>{index + 1}</th>
              <td>{formatDate(user.created_at)}</td>
              <td>{user.wallet_address}</td>
              <td>{user.refer_code}</td>
              <td>{user.referred_by ? user.referred_by : '-'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-4 text-red-500">
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

export default AllUsers;