import React from 'react';
import { Form } from 'react-bootstrap';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange, required = false }) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} value={value} onChange={onChange} required={required} />
    </Form.Group>
  );
};

export default InputField;
