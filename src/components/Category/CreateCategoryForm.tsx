import React, { useEffect, useState } from 'react';
import { Category } from '../../services/types'; 
import SelectInput from '../common/SelectInput';
import InputField from '../common/InputField';
import { Form,Container, Row, Col } from 'react-bootstrap';
import { ButtonNode } from '../../components/common/Button';


interface CreateCategoryFormProps {
    category?: Category;
    onSubmit: (category: Category) => void;
    closeModal: () => void;
  }

const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({ category, onSubmit, closeModal }) => {
    const [categoryData, setCateforyData] = useState<Category>(
        category || { id: 0, name: ''}
      );
    const [formData, setFormData] = useState<Category>({
        id: category ? category.id : 0,
        name: category ? category.name : '',
      });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (category) {
        setFormData({
          id: category.id,
          name: category.name,
        });
      }

  }, [category]);


  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.title = 'Name is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'name' ? String(value) : value,
    });
  };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            onSubmit(formData);
            closeModal();
        }
    };

  return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
            </div>
                    <Form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
                        <InputField 
                            type='text'
                            label='Nama'
                            value={formData.name}
                            name="name"
                            onChange={handleChange} 
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                        
            <div className="modal-footer">
                <ButtonNode type="submit" variant="primary">{category ? 'Update Category' : 'Create Category'}</ButtonNode>
                <ButtonNode type="button" variant="danger" onClick={closeModal}>Cancel</ButtonNode>
            </div>
            </Form>
            </div>
        </div>
  );
};

export default CreateCategoryForm;
