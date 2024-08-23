import React, { useEffect, useState } from 'react';
import { useStore } from '../utils/store';
import { fetchProgressData } from '../utils/api';
import ProgressTracker from '../components/ProgressTracker';
import GoalForm from '../components/GoalForm';
import Notification from '../components/Notification';

const Dashboard = () => {
    const { user } = useStore((state) => state);
    const [userGoals, setUserGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserGoals = async () => {
            if (user) {
                try {
                    const goals = await fetchProgressData(user.id);
                    setUserGoals(goals);
                } catch (err) {
                    console.error(err);
                    setError('Failed to fetch goals. Please try again later.');
                } finally {
                    setLoading(false);
                }
            }
        };
        getUserGoals();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container p-4">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <Notification />
            {error && <div className="text-red-500">{error}</div>}
            <GoalForm />
            {userGoals.length > 0 ? (
                <ProgressTracker goals={userGoals} />
            ) : (
                <div>No goals set. Create a new goal to get started!</div>
            )}
        </div>
    );
};

export default Dashboard;