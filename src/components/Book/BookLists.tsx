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


const flattenObject = (obj: any, prefix = ''): any => {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  };


export default BookList;
