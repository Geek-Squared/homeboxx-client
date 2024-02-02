import React from 'react';

interface FilterToggleProps {
   setFieldValue?: any;
   values?: any;
   Field?: any;
}

const FilterToggle: React.FC<FilterToggleProps> = ({setFieldValue, values, Field}) => {

    return (
        <div className="listingType">
        {['Sale', 'Rent'].map(type => (
            <button
                key={type}
                className={values.listingType === type ? 'selected' : ''}
                onClick={(e) => {
                    setFieldValue('listingType', type);
                    e.preventDefault();
                }}
            >
                {type}
            </button>
        ))}
        <Field type="hidden" name="listingType" value={values.listingType} />
    </div>

    );
};

export default FilterToggle;
