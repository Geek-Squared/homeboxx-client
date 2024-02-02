import React from 'react';
import ButtonContainer from '../../../buttons/buttonContainer';

interface StepTwoProps {
    step: number;
    values: any;
    setFieldValue: any;
    isSubmitting: boolean;
    setStep: any;
    Field?: any;
    ErrorMessage?: any;
}

const StepTwo: React.FC<StepTwoProps> = ({ step, isSubmitting, setStep, Field, ErrorMessage }) => {
    if (step !== 2) {
        return null;
    }

    return (
        <>
            <label htmlFor="title" className="label">Title</label>
            <Field type="text" name="title" className="input" />
            <ErrorMessage name="title" component="div" />

            <label htmlFor="description" className="label">Description</label>
            <Field as="textarea" name="description" className="input largeTextArea" />
            <ErrorMessage name="description" component="div" />

            <ButtonContainer
                isSubmitting={isSubmitting}
                onBackClick={() => setStep(1)}
                onContinueClick={() => setStep(3)}
                buttonText="Next"
                buttonType="button"
            />
        </>
    );
};

export default StepTwo;