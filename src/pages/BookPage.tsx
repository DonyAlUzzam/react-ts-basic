import React, { useEffect, useState } from 'react';
import BookList from '../components/Book/BookLists';
import CreateBookForm from '../components/Book/CreateBookForm';
import { Book, Category } from '../services/types';
import { Modal } from 'react-bootstrap';
import { createBook,deleteBook, updateBook, fetchBook } from '../services/bookService';
import { fetchCategory } from '../services/categoryService';
import { ButtonNode } from '../components/common/Button';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const getBooks = async () => {
        try {
          const response = await fetchBook();
          setBooks(response.data.data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
        const categoriesResponse = await fetchCategory();
        setCategories(categoriesResponse.data.data);
      };
  
      getBooks();
    }, []);

    const handleCloseModal = () => {
      // setSelectedBook(null);
      setIsModalOpen(false);
    };

    const handleUpdate = (book: Book) => {
      setSelectedBook(book);
      setIsModalOpen(true);
    };

    const handleCreate = () => {
      setSelectedBook(null);
      setIsModalOpen(true);
    };


    const openModal = (book?: Book) => {
      setSelectedBook(book || null);
      setIsModalOpen(true);
    };
  

    const handleDelete = async (id: number) => {
      setLoading(true);
      try {
        await deleteBook(id);
        setBooks(books.filter((book) => book.id !== id));
        toast.success('Delete Book successfully!');
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        toast.error('Delete Book Failed!');
        console.error('Error deleting book:', error);
      }
    };

    const handleSubmit = async (bookData: Book) => {
      // e.preventDefault();
      setLoading(true);
      try {
          if(!selectedBook){
              const createdBook = await createBook(bookData);
              setBooks((prevBooks) => [...prevBooks, createdBook.data.data]);
              toast.success('Create Book successfully!');
              setTimeout(() => {
                setLoading(false);
              }, 500);
              console.log('Book created:', createdBook);
          } else {
              const updatedBook = await updateBook(bookData.id, bookData);
              setBooks((prevBooks) =>
                  prevBooks.map((book) => (book.id === updatedBook.data.data.id ? updatedBook.data.data : book))
                );
              toast.success('Update Book successfully!');
                setTimeout(() => {
                  setLoading(false);
              }, 500);
              console.log('Book Updated:', updatedBook);
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
        setIsModalOpen(true);
        setLoading(false);
        toast.error( selectedBook ? 'Update Book Failed!' : 'Create Book Failed!');
        setTimeout(() => {
          setLoading(false);
        }, 500);
        console.error('Error asa book',error);
      }
    };

    return (
      <>
          <div>
            <h2>List Buku</h2>
            <ButtonNode type="submit" variant="primary" onClick={() => openModal()}>Add Book</ButtonNode>
            <BookList books={books}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            />
            {isModalOpen && (
              <CreateBookForm onSubmit={handleSubmit} category={categories} book={selectedBook || undefined} closeModal={handleCloseModal}/>
          )}
          </div>
        {loading && <Loading />}
      </>
    );
};

export default BooksPage;