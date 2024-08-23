import React, { useState } from 'react';
import { useStore } from '../utils/store';
import { createGoal } from '../utils/api';

const GoalForm = () => {
    const { user } = useStore((state) => state);
    const [activityType, setActivityType] = useState('');
    const [target, setTarget] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!activityType || !target) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const goalData = {
                userId: user.id,
                activityType,
                target: Number(target),
            };
            await createGoal(goalData);
            setSuccess(true);
            setActivityType('');
            setTarget('');
        } catch (err) {
            console.error(err);
            setError('Failed to create goal. Please try again later.');
        }
    };

    return (
        <div className="goal-form">
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">Goal created successfully!</div>}
            <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Set Your Fitness Goal</h2>
                <div className="mb-4">
                    <label htmlFor="activityType" className="block mb-2">Activity Type</label>
                    <input
                        id="activityType"
                        type="text"
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="target" className="block mb-2">Target (in units)</label>
                    <input
                        id="target"
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        min="1"
                        className="border border-gray-400 p-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default GoalForm;