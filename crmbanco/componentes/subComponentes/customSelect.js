import React from 'react';
import Select from 'react-select'

const CustomSelect = ({ onChange, options, value, label} ) => {

    const defaultValue = (options,value) => {
        return options ? options.find(option => option.value === value):''
    }

    return (

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold " htmlFor="tipo">
                {label}
            </label>
            <Select className="bg-gray-700 w-full mt-2 p-2 text-black hover:bg-gray-700"
                    value={defaultValue(options,value)}
                    onChange={value => onChange(value)}
                    options={options}
            />
        </div>
    )
}
export default CustomSelect;