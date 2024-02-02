import React from 'react';
import './styles.scss';

interface StepperProps {
  step: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ step, totalSteps }) => {
  return (
    <div className="stepper">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <div className={`step ${step > i ? 'completed' : ''}`} />
          {i < totalSteps - 1 && <div className={`line ${step > i + 1 ? 'completed' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;