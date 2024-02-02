import React from 'react';
import ButtonContainer from '../../../buttons/buttonContainer';

interface StepThreeProps {
    step: number;
    values: any;
    setFieldValue: any;
    isSubmitting: boolean;
    setStep: any;
    Field?: any;
    ErrorMessage?: any;
}

const StepThree: React.FC<StepThreeProps> = ({ step, values, isSubmitting, setStep, Field, ErrorMessage }) => {
    if (step !== 3) {
        return null;
    }

    return (
        <>
            {
                values.listingType === 'Rent' ? (
                    <>
                        <label htmlFor="priceFrequency" className="label">Frequency</label>
                        <Field as="select" name="priceFrequency" className="input">
                            <option value="">Select frequency</option>
                            <option value="Month">Month</option>
                            <option value="Week">Week</option>
                            <option value="Day">Day</option>
                        </Field>
                        <ErrorMessage name="priceFrequency" component="div" />
                        <hr />
                        <label htmlFor="price" className="label">Price $</label>
                        <div className="input-wrapper">
                            <Field type="number" name="price" className="input-currency" />
                            <span className="input-addon">/{values.priceFrequency}</span>
                        </div>
                        <ErrorMessage name="price" component="div" />
                    </>
                ) :
                    (
                        <>
                            <label htmlFor="price" className="label">Price $</label>
                            <div className="input-wrapper">
                                <Field type="number" name="price" className="input-currency" />
                            </div>
                            <ErrorMessage name="price" component="div" />
                        </>
                    )
            }

            <ButtonContainer
                isSubmitting={isSubmitting}
                onBackClick={() => setStep(2)}
                onContinueClick={() => setStep(4)}
                buttonText="Next"
                buttonType="button"
            />
        </>
    );
};

export default StepThree;