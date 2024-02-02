import React from 'react';
import './styles.scss';

interface AuthButtonsProps {
    buttonText: string;
    additionalText: string;
    spanText: string;
    redirectLink?: string;
}

// Component for the login and registration buttons
const AuthButtons: React.FC<AuthButtonsProps> = ({ buttonText, additionalText, spanText, redirectLink }) => {
    return (
        <div className="button-reg-link">
            <button type="submit">{buttonText}</button>
            <span className="register-link">{additionalText} <a href={redirectLink} className="reg-text">{spanText}</a> </span>
        </div>
    );
};

export default AuthButtons;