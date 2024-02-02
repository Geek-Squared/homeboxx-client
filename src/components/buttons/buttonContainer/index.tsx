import React from 'react';
import './styles.scss';

interface ButtonContainerProps {
    isSubmitting: boolean;
    onBackClick?: () => void;
    onContinueClick?: () => void;
    buttonText: string;
    buttonType?: 'button' | 'submit';
    showBackButton?: boolean;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ isSubmitting, onBackClick, buttonText, buttonType, onContinueClick, showBackButton = true }) => {
    return (
        <div className="button-container">
            {showBackButton && (
                <button type="button" onClick={onBackClick} className="button back-button">
                    Back
                </button>
            )}
           
            <button type={buttonType} disabled={isSubmitting} onClick={onContinueClick} className="button" >
                {buttonText}
            </button>
        </div>
    );
};

export default ButtonContainer;