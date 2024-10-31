import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import maintenanceAnimation from './assets/lottie/Website Maintenance.json';
import Lottie from 'react-lottie';
const NotFound = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation

    const handleGoHome = () => {
        navigate('/'); // Navigate to the home page
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: maintenanceAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            {/* SVG Illustration */}
            <div className="mb-4">
                <Lottie options={defaultOptions} height={400} width={400} />
            </div>

            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <h2 className=" text-3xl font-semibold text-gray-600">Page Not Found</h2>
            <p className="mt-2 text-gray-500">
                Oops! The page you are looking for does not exist. <br></br><span className="ml-2">Return to the home page</span>
            </p>




            <button
                onClick={handleGoHome}
                className="mt-2 rounded-full bg-secondary text-primary-foreground py-2 px-4  hover:bg-secondary-light transition duration-300"
            ><FontAwesomeIcon icon={faHome} className="text-2xl" />
                <span className="ml-2">Go to Home</span>
            </button>
        </div>
    );
};

export default NotFound;
