import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import { ButtonNode } from '../../components/common/Button';
import {login} from '../../services/authService';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading'
import { Form,Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ email, password });
      toast.success('Logged in successfully!');
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      history.push('/books');
    } catch (err:any) {
      const errors = err.response.data.message;
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
        setLoading(false);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
              <InputField
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* {error && <p className="mt-3">{error}</p>} */}
              <ButtonNode type="submit" variant="primary">Login</ButtonNode>
              <p>Belum punya akun? <Link to="/register">Register disini</Link>.</p>
            </Form>
          </Col>
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
  
};

export default Login;
