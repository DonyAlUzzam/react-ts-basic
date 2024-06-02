import React from 'react';
import { IconType } from 'react-icons';
import { Button } from 'react-bootstrap';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: string;
  children: React.ReactNode;
}

interface IconButtonProps {
  icon: IconType;
  variant?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const ButtonNode: React.FC<ButtonProps> = ({ type, onClick, children, variant = 'primary' }) => {
  return (
    <Button type={type} variant={variant} onClick={onClick} className="flex-row align-items-center m-2">
      {children}
    </Button>
  );
};

export const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, variant = 'primary', onClick, children }) => {
  return (
    <Button variant={variant} onClick={onClick} className="align-items-center m-2">
      <Icon className="me-2" />
      {children}
    </Button>
  );
};

// export default Button;
