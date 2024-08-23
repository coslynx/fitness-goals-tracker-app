import React from 'react';
import Header from '../components/Header';
import Notification from '../components/Notification';
import GoalForm from '../components/GoalForm';
import ProgressTracker from '../components/ProgressTracker';
import { useStore } from '../utils/store';

const Home = () => {
    const { user } = useStore(state => state);

    return (
        <div className="home-container">
            <Header />
            <Notification />
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome to Fitness Tracker</h1>
                {user ? (
                    <>
                        <GoalForm />
                        <ProgressTracker />
                    </>
                ) : (
                    <div className="text-lg">
                        Please log in to set your fitness goals and track your progress.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;