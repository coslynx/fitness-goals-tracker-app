import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../utils/store';

const Header = () => {
    const { user, logout } = useStore((state) => ({
        user: state.user,
        logout: state.logout,
    }));

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="bg-primary text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                Fitness Tracker
            </h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-accent">Home</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="hover:text-accent">Dashboard</Link>
                    </li>
                    {user ? (
                        <>
                            <li>
                                <Link to="/profile" className="hover:text-accent">Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="hover:text-accent">Logout</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login" className="hover:text-accent">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;