import React from 'react';
import ShareLink from '../components/dashboard/ShareLink';
import DashboardTable from '../components/dashboard/DashboardTable';

const Dashboard = () => {
    return (
        <div className='container mx-auto p-4'>
            <ShareLink/>

            <DashboardTable/>
        </div>
    );
};

export default Dashboard;