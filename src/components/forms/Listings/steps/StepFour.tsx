// StepFour.tsx
import React from 'react';
import ButtonContainer from '../../../buttons/buttonContainer';

interface StepFourProps {
    step: number;
    values: any;
    setFieldValue: any;
    isSubmitting: boolean;
    setStep: any;
    Field?: any;
    ErrorMessage?: any;
}

const StepFour: React.FC<StepFourProps> = ({ step, values, isSubmitting, setStep, Field, ErrorMessage }) => {
    if (step !== 4) {
        return null;
    }

    return (
        <>
            {
                values.listingType === 'Sale' && (
                    <>
                        <label htmlFor="propertyArea" className="label">Property Area</label>
                        <Field type="number" name="propertyArea" className="input" />
                        <ErrorMessage name="propertyArea" component="div" />

                        <label htmlFor="propertyAreaUnit" className="label">Property Area Unit</label>
                        <Field type="text" name="propertyAreaUnit" className="input" />
                        <ErrorMessage name="propertyAreaUnit" component="div" />
                    </>
                )
            }

            <label htmlFor="location" className="label">Location</label>
            <Field type="text" name="location" className="input" />
            <ErrorMessage name="location" component="div" />

            <ButtonContainer
                isSubmitting={isSubmitting}
                onBackClick={() => setStep(3)}
                onContinueClick={() => setStep(5)}
                buttonText="Next"
                buttonType="button"
            />
        </>
    );
};

export default StepFour;

