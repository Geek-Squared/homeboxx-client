import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useListingStore} from "../../../customHooks/listing"
import './styles.scss';
import Stepper from '../../stepper';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import StepFive from './steps/StepFive';
import StepSix from './steps/StepSix';
import { amenities, propertyTypes } from '../../../constants';
import { useNavigate } from 'react-router-dom';


const ListingForm = () => {
    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState<File[]>([]);
    const addListing = useListingStore(state => state.addListing);
    const fetchAllListings = useListingStore(state => state.fetchListingByOwner);
    const listings = useListingStore(state => state.listings);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllListings();
    }, [fetchAllListings]);



    console.log(listings);
    

    const handleSubmit = async (values: any, actions: { setSubmitting: (arg0: boolean) => void; }) => {
        if (step < 6) {
            setStep(step + 1);
        } else {
            // Submit the form
            try {
                const formData = new FormData();
                Object.keys(values).forEach(key => formData.append(key, values[key]));
                if (selectedFile) {
                    selectedFile.forEach((file) => {
                        formData.append('imageUrl', file);
                    });
                }
                await addListing(formData);
                navigate('/success');
            } catch (error) {
                console.error('Error:', error);
            }
        }
        actions.setSubmitting(false);
    };
    
    return (
        <div>
            <Stepper totalSteps={5} step={step} />
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    price: '',
                    listingType: '',
                    propertyArea: '',
                    priceFrequency: '',
                    propertyType: '',
                    propertyAreaUnit: '',
                    location: '',
                    bedrooms: '',
                    bathrooms: '',
                    lounges: '',
                    amenities: [],
                }}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <StepOne
                            isSubmitting={isSubmitting}
                            propertyTypes={propertyTypes}
                            setFieldValue={setFieldValue}
                            setStep={setStep}
                            step={step}
                            ErrorMessage={ErrorMessage}
                            Field={Field}
                            values={values}
                        />

                        <StepTwo
                            isSubmitting={isSubmitting}
                            setFieldValue={setFieldValue}
                            setStep={setStep}
                            step={step}
                            ErrorMessage={ErrorMessage}
                            Field={Field}
                            values={values}
                        />
                        <StepThree
                            isSubmitting={isSubmitting}
                            setFieldValue={setFieldValue}
                            setStep={setStep}
                            step={step}
                            ErrorMessage={ErrorMessage}
                            Field={Field}
                            values={values}
                        />
                        <StepFour
                            isSubmitting={isSubmitting}
                            setFieldValue={setFieldValue}
                            setStep={setStep}
                            step={step}
                            ErrorMessage={ErrorMessage}
                            Field={Field}
                            values={values}
                        />
                        <StepFive
                            isSubmitting={isSubmitting}
                            setFieldValue={setFieldValue}
                            setStep={setStep}
                            step={step}
                            ErrorMessage={ErrorMessage}
                            Field={Field}
                            values={values}
                            amenities={amenities}
                        />
                        <StepSix
                            isSubmitting={isSubmitting}
                            setFieldValue={setFieldValue}
                            setStep={setStep}
                            step={step}
                            values={values}
                            setSelectedFile={setSelectedFile}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ListingForm;
