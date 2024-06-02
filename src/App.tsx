import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BooksPage from './pages/BookPage';
import CategoriesPage from './pages/CategoryPage';
// import AuthorsPage from './pages/AuthorsPage';
import LoginPage from './pages/Auth/Login';
// import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
      <Main />
    </Router>
    </>
  );
};

const Main: React.FC = () => {
  const location = useLocation();

  const noSidebarRoutes = ['/login', '/register'];
  const shouldShowSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div id="wrapper">
      {shouldShowSidebar && <Sidebar />}
      <div id="page-content-wrapper" style={{ marginLeft: shouldShowSidebar ? 250 : 0 }}>
        <Switch>
          <PrivateRoute path="/books" component={BooksPage} />
          <PrivateRoute path="/categories" component={CategoriesPage} />
          {/* <PrivateRoute path="/authors" component={AuthorsPage} /> */}
          <Route path="/login" component={LoginPage} />
          {/* <Route path="/register" component={RegisterPage} /> */}
          <PrivateRoute path="/" component={BooksPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
