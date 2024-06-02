import React from 'react';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  id:string;
  name: string;
  value: string | number;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ name, value, options, onChange, label, required = false }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <select id={name} name={name} value={value} onChange={onChange} required={required} className="form-control">
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
