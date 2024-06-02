import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import { ButtonNode } from '../../components/common/Button';
import {login} from '../../services/authService';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading'
import { Form,Container, Row, Col } from 'react-bootstrap';


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
    } catch (err) {
      setError('Invalid credentials');
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
                required
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p className="mt-3">{error}</p>}
              <ButtonNode type="submit" variant="primary">Login</ButtonNode>
            </Form>
          </Col>
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
  
};

export default Login;
