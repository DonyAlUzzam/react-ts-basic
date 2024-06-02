import React, { useEffect, useState } from 'react';
import { fetchCategory } from '../../services/categoryService'
import { Book, Category } from '../../services/types'; 
import SelectInput from '../common/SelectInput';
import InputField from '../common/InputField';
import { Form,Container, Row, Col } from 'react-bootstrap';
import { ButtonNode } from '../../components/common/Button';


interface CreateBookFormProps {
    book?: Book;
    category: Category[];
    onSubmit: (book: Book) => void;
    closeModal: () => void;
  }

const CreateBookForm: React.FC<CreateBookFormProps> = ({ book,category, onSubmit, closeModal }) => {
    const [bookData, setBookData] = useState<Book>(
        book || { id: 0, title: '', quantity: 0, category_id: 0 }
      );
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<Book>({
        id: book ? book.id : 0,
        title: book ? book.title : '',
        quantity: book ? book.quantity : 0,
        category_id: book ? book.category_id : 0,
      });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategory();
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (book) {
        setFormData({
          id: book.id,
          title: book.title,
          quantity: book.quantity,
          category_id: book.category_id,
        });
      }

    getCategories();
  }, [book]);


  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'title' ? String(value) : value,
    //   [name]: name === 'quantity' ? Number(value) : value,
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
                <h5 className="modal-title">Add Book</h5>
            </div>
                    <Form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
                        <InputField 
                            type='text'
                            label='Title'
                            value={formData.title}
                            name="title"
                            onChange={handleChange} 
                        />
                        {errors.title && <span className="error">{errors.title}</span>}
                        
                        <InputField
                            type='text'
                            label='Qantity'
                            value={formData.quantity}
                            name="quantity"
                            onChange={handleChange} 
                        />
                        {errors.quantity && <span className="error">{errors.quantity}</span>}
                        
                        <SelectInput
                            id="categoryId"
                            name="category_id"
                            value={formData.category_id}
                            options={categories.map(category => ({ value: category.id, label: category.name }))}
                            onChange={handleChange}
                            label="Category"
                        />
                        
                        
                    
            <div className="modal-footer">
                <ButtonNode type="submit" variant="primary">{book ? 'Update Book' : 'Create Book'}</ButtonNode>
                <ButtonNode type="button" variant="danger" onClick={closeModal}>Cancel</ButtonNode>
            </div>
            </Form>
            </div>
        </div>
  );
};

export default CreateBookForm;
