import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Sidebar.css'; 
import authService from '../services/authService';

const Sidebar: React.FC = () => {
    const history = useHistory();
    const handleLogout = async () => {
        try {
          await authService.logout();
          history.push('/login'); // Redirect to login page
        } catch (error) {
          console.error('Logout failed', error);
        }
      };
    
  return (
    <div className="bg-dark" id="sidebar-wrapper">
      <div className="sidebar-heading">My Dashboard</div>
      <ListGroup>
        <ListGroup.Item className="bg-dark">
          <Link to="/books" className="text-decoration-none text-reset">
            <i className="fas fa-book me-2"></i> Books
          </Link>
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark">
          <Link to="/categories" className="text-decoration-none text-reset">
            <i className="fas fa-list me-2"></i> Categories
          </Link>
        </ListGroup.Item>
        <ListGroup.Item className="bg-dark" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
