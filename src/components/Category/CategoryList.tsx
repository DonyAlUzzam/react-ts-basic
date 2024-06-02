import React, { useEffect, useState } from 'react';
import DataTable from '../common/DataTable';
import { Category } from '../../services/types';


interface CategoryProps {
    categories: Category[];
    onUpdate: (category: Category) => void;
    onDelete: (id: number) => void;
  }

const CategoryList: React.FC<CategoryProps> = ({ categories, onUpdate, onDelete }) => {

  const columns = [
    { key: 'name', header: 'Name' },
  ];

  return (
    <div>
    <DataTable data={categories} columns={columns} onDelete={onDelete} onUpdate={onUpdate}  />
  </div>
  );
};


export default CategoryList;
