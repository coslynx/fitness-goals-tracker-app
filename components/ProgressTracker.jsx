import React, { useEffect, useState } from 'react';
import { useStore } from '../utils/store';
import { fetchProgressData } from '../utils/api';
import Chart from 'react-chartjs-2';

const ProgressTracker = () => {
    const [progressData, setProgressData] = useState([]);
    const { user } = useStore((state) => state);

    useEffect(() => {
        const getProgressData = async () => {
            if (user) {
                try {
                    const data = await fetchProgressData(user.id);
                    setProgressData(data);
                } catch (error) {
                    console.error("Error fetching progress data:", error);
                }
            }
        };
        getProgressData();
    }, [user]);

    const prepareChartData = () => {
        const labels = progressData.map(entry => entry.date);
        const dataValues = progressData.map(entry => entry.value);
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Your Progress',
                    data: dataValues,
                    backgroundColor: '#3b82f6',
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                    fill: false,
                },
            ],
        };
    };

    if (!progressData.length) {
        return <div>No progress data available.</div>;
    }

    return (
        <div className="progress-tracker">
            <h2 className="text-2xl font-bold mb-4">Your Progress Tracking</h2>
            <Chart
                type="line"
                data={prepareChartData()}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Value',
                            },
                            beginAtZero: true,
                        },
                    },
                }}
            />
        </div>
    );
};

export default ProgressTracker;