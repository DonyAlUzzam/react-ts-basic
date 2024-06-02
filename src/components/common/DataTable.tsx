import React from 'react';
import { IconButton } from '../common/Button';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Column {
  key: string;
  header: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onDelete: (id: number) => void;
  onUpdate: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onDelete, onUpdate }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
        <th>No</th>
          {columns.map(column => (
            <th key={column.key}>{column.header}</th>
          ))}
        <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="align-middle">
            <td>{rowIndex + 1}</td>
            {columns.map(column => (
              <td key={column.key}>{row[column.key]}</td>
            ))}
            <td>
              <IconButton icon={FaEdit} variant="warning"  onClick={() => onUpdate(row)}>Update</IconButton> 
              <IconButton icon={FaTrash} variant="danger" onClick={() => onDelete(row.id)}>Delete</IconButton> 
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
  

export default DataTable;
