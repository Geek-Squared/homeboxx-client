import React from 'react';
import ButtonContainer from '../../../buttons/buttonContainer';
import FilterToggle from '../../../buttons/toggle/filterToggle';

interface StepOneProps {
    step: number;
    values: any;
    setFieldValue: any;
    isSubmitting: boolean;
    setStep: any;
    propertyTypes: string[];
    Field?: any;
    ErrorMessage?: any;
}

const StepOne: React.FC<StepOneProps> = ({ step, values, setFieldValue, isSubmitting, setStep, propertyTypes, Field, ErrorMessage }) => {
    if (step !== 1) {
        return null;
    }

    return (
        <>
            <div className="heading">
                <h3>Let's get started</h3>
                <p>Tell us about your property</p>
            </div>
            
            <FilterToggle
                Field={Field}
                setFieldValue={setFieldValue}
                values={values}
            />

            <label htmlFor="propertyType" className="label">Property Type</label>
            <Field as="select" name="propertyType" className="input">
                <option value="">Select a property type</option>
                {propertyTypes.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </Field>
            <ErrorMessage name="propertyType" component="div" />

            {
                values.propertyType === 'Farm' || values.propertyType === 'Land' || values.propertyType === 'Stand' || values.propertyType === 'Commercial Property' || values.propertyType === 'Industrial Property' ? (
                    null
                ) :
                    (
                        <>
                            <label htmlFor="bedrooms" className="label">Bedrooms</label>
                            <Field as="select" name="bedrooms" className="input">
                                {Array.from({ length: 21 }, (_, i) => i).map((number) => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="bedrooms" component="div" />

                            <label htmlFor="bathrooms" className="label">Bathrooms</label>
                            <Field as="select" name="bathrooms" className="input">
                                {Array.from({ length: 21 }, (_, i) => i).map((number) => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="bathrooms" component="div" />

                            <label htmlFor="lounges" className="label">Lounges</label>
                            <Field as="select" name="lounges" className="input">
                                {Array.from({ length: 21 }, (_, i) => i).map((number) => (
                                    <option key={number} value={number}>{number}</option>
                                ))}
                            </Field>
                        </>
                    )
            }

            <ButtonContainer
                isSubmitting={isSubmitting}
                onContinueClick={() => setStep(2)}
                buttonText="Next"
                buttonType="button"
                showBackButton={false}
            />
        </>
    );
};

export default StepOne;