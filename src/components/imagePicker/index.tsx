import React, { useState } from 'react';

interface ImagePickerProps {
    onImagesPicked: (images: File[]) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImagesPicked }) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [pickedImages, setPickedImages] = useState<File[]>([]);

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const newPickedFiles = Array.from(event.target.files);
            const allPickedFiles = [...pickedImages, ...newPickedFiles];
            setPickedImages(allPickedFiles);
            const fileReaders = newPickedFiles.map(file => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                return new Promise((resolve, reject) => {
                    fileReader.onload = () => {
                        resolve(fileReader.result as string);
                    };
                    fileReader.onerror = () => {
                        reject();
                    };
                });
            });
            Promise.all(fileReaders).then((urls: any) => {
                setPreviewUrls(prevUrls => [...prevUrls, ...urls]);
                onImagesPicked(allPickedFiles);
            });
        }
    };

    const deleteHandler = (deleteIndex: number) => {
        const newPreviewUrls = previewUrls.filter((_, index) => index !== deleteIndex);
        const newPickedImages = pickedImages.filter((_, index) => index !== deleteIndex);
        setPreviewUrls(newPreviewUrls);
        setPickedImages(newPickedImages);
        onImagesPicked(newPickedImages);
    };

    return (
        <div className="image-upload">
            <div className="image-upload__preview">
                {previewUrls.map((url, index) => (
                    <div key={index} className="image-upload__preview-image">
                        <img src={url} alt="Preview" />
                        <button onClick={() => deleteHandler(index)}>Delete</button>
                    </div>
                ))}
                {previewUrls.length === 0 && <p>Please pick an image.</p>}
            </div>
            <label className="image-upload__button">
                <input type="file" accept=".jpg,.png,.jpeg" onChange={pickedHandler} style={{ display: 'none' }} multiple />
                <span>+</span>
            </label>
        </div>
    );
};

export default ImagePicker;