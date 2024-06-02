import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import { Book } from '../../services/types';


interface BookListProps {
    books: Book[];
    onUpdate: (book: Book) => void;
    onDelete: (id: number) => void;
  }

const BookList: React.FC<BookListProps> = ({ books, onUpdate, onDelete }) => {

  const columns = [
    { key: 'title', header: 'Title' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'categoryName', header: 'Category' },
  ];

  const formattedBooks = books.map((book) => ({
    ...book,
    categoryName: book.category ? book.category.name : 'No Category',
  }));

  return (
    <div>
    <DataTable data={formattedBooks} columns={columns} onDelete={onDelete} onUpdate={onUpdate}  />
  </div>
  );
};

export default BookList;
