import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const StepSeven: React.FC = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/listings');
    };

    return (
        <div className="stepSeven">
            <FontAwesomeIcon icon={faCheckCircle} className="successIcon" />
            <h2>SUCCESS</h2>
            <p>You are good to go your property listing has been created</p>
            <button onClick={handleContinue} className="continueButton">Continue</button>
        </div>
    );
};

export default StepSeven;