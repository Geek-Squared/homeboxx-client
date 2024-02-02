import React from 'react';
import ButtonContainer from '../../../buttons/buttonContainer';
import { FieldArray } from 'formik';

interface StepFiveProps {
    step: number;
    values: any;
    setFieldValue: any;
    isSubmitting: boolean;
    setStep: any;
    Field?: any;
    ErrorMessage?: any;
    amenities: string[];
    FieldArray?: any;
}

const StepFive: React.FC<StepFiveProps> = ({ step, values, isSubmitting, setStep, amenities }) => {
    if (step !== 5) {
        return null;
    }

    return (
        <>
            <h4>Amenities</h4>
            <FieldArray name="amenities">
                {({ push, remove }) => (
                    <div className="amenities-container">
                        {amenities.map((amenity) => (
                            <div className="amenity-item" key={amenity}>
                                <input
                                    type="checkbox"
                                    name="amenities"
                                    value={amenity}
                                    checked={values.amenities.includes(amenity)}
                                    onChange={(e) => {
                                        if (e.target.checked) push(amenity);
                                        else {
                                            const idx = values.amenities.indexOf(amenity);
                                            remove(idx);
                                        }
                                    }}
                                />
                                <label>{amenity}</label>
                            </div>
                        ))}
                    </div>
                )}
            </FieldArray>

            <ButtonContainer
                isSubmitting={isSubmitting}
                onBackClick={() => setStep(4)}
                onContinueClick={() => setStep(6)}
                buttonText="Next"
                buttonType="button"
            />
        </>
    );
};

export default StepFive;
