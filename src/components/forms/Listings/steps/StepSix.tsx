import React, { useState } from 'react';
import ButtonContainer from '../../../buttons/buttonContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface StepSixProps {
    step: number;
    values: any;
    setFieldValue: any;
    isSubmitting: boolean;
    setStep: any;
    setSelectedFile: any;
}

const StepSix: React.FC<StepSixProps> = ({ step, isSubmitting, setStep, setSelectedFile }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    if (step !== 6) {
        return null;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //@ts-ignore
        setSelectedFiles(Array.from(event.target.files));
        //@ts-ignore
        setSelectedFile(Array.from(event.target.files));
    };

    const removeImage = (index: number) => {
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(index, 1);
        setSelectedFiles(newSelectedFiles);
    };

    return (
        <>
            <label htmlFor="image">Upload Property Images</label>
            <div className="uploadBox">
                <FontAwesomeIcon icon={faUpload} className="fa-upload" />
                <p className="uploadText">Add your property images here</p>
                <label htmlFor="image" className="browseButton">Browse Files</label>
                <input type="file" name="imageUrl" id="image" multiple onChange={handleImageChange} style={{ display: 'none' }} />
            </div>

            <div className="imagePreview">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="imageContainer">
                        <img src={URL.createObjectURL(file)} alt="Preview" />
                        <FontAwesomeIcon icon={faTimesCircle} className="removeIcon" onClick={() => removeImage(index)} />
                    </div>
                ))}
            </div>

            <ButtonContainer
                isSubmitting={isSubmitting}
                onBackClick={() => setStep(5)}
                buttonText="Submit"
                buttonType="submit"
            />
        </>
    );
};

export default StepSix;