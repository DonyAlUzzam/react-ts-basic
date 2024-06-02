import React, { useEffect, useState } from 'react';
import CategoryList from '../components/Category/CategoryList';
import CreateCategoryForm from '../components/Category/CreateCategoryForm';
import { Category } from '../services/types';
import { fetchCategory, createCategory, updateCategory, deleteCategory } from '../services/categoryService';
import { ButtonNode } from '../components/common/Button';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CategoryPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    useEffect(() => {
      const getCategories = async () => {
        try {
          const response = await fetchCategory();
          setCategories(response.data.data);
        } catch (error) {
          console.error('Error fetching Categories:', error);
        }
       
      };
  
      getCategories();
    }, []);

    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleUpdate = (categories: Category) => {
      setSelectedCategory(categories);
      setIsModalOpen(true);
    };

    const handleCreate = () => {
      setSelectedCategory(null);
      setIsModalOpen(true);
    };


    const openModal = (categories?: Category) => {
      setSelectedCategory(categories || null);
      setIsModalOpen(true);
    };
  

    const handleDelete = async (id: number) => {
      setLoading(true);
      try {
        await deleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
        toast.success('Delete Category successfully!');
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        toast.error('Delete Category Failed!');
        console.error('Error deleting category:', error);
      }
    };

    const handleSubmit = async (categoryData: Category) => {
      // e.preventDefault();
      setLoading(true);
      try {
          if(!selectedCategory){
              const createdCategory = await createCategory(categoryData);
              setCategories((prevCategories) => [...prevCategories, createdCategory.data.data]);
              toast.success('Create Category successfully!');
              setTimeout(() => {
                setLoading(false);
              }, 500);
              console.log('Category created:', createdCategory);
          } else {
              const updatedCategory = await updateCategory(categoryData.id, categoryData);
              setCategories((prevCategories) =>
                prevCategories.map((category) => (category.id === updatedCategory.data.data.id ? updatedCategory.data.data : category))
                );
              toast.success('Update Category successfully!');
                setTimeout(() => {
                  setLoading(false);
              }, 500);
              console.log('Category Updated:', updatedCategory);
          }
          handleCloseModal()
      } catch (error:any) {
        const errors = error.response.data.message;
        if (typeof errors === 'object' && !Array.isArray(errors)){
            const errorMessages = Object.keys(errors.errors).map(key => errors.errors[key].join(' ')).join(' ');
            console.log(errorMessages, 'mes')
            setError(errorMessages);
            MySwal.fire({
              title: 'Error',
              text: errorMessages,
              icon: 'error',
            });
        }else{
            setError(errors); 
            MySwal.fire({
              title: 'Error',
              text: errors,
              icon: 'error',
            });
        }
        toast.error( selectedCategory ? 'Update Category Failed!' : 'Create Category Failed!');
        setTimeout(() => {
          setLoading(false);
        }, 500);
        console.error('Error handling category:', error);
      }
    };

    return (
      <>
          <div>
            <h2>List Kategori</h2>
            <ButtonNode type="submit" variant="primary" onClick={() => openModal()}>Add Category</ButtonNode>
            <CategoryList categories={categories}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            />
            {isModalOpen && (
              <CreateCategoryForm onSubmit={handleSubmit} category={selectedCategory || undefined}  closeModal={handleCloseModal}/>
          )}
          </div>
        {loading && <Loading />}
      </>
    );
};

export default CategoryPage;