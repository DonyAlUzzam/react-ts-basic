import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import { ButtonNode } from '../../components/common/Button';
import {register} from '../../services/authService';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading'
import { Form,Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register({ name, email, password });
      toast.success('Register successfully!');
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      history.push('/books');
    } catch (err: any) {
        console.log(err.response, "as")
        if (err.response && err.response.data && err.response.data.message.errors) {
            const errors = err.response.data.message;
            console.log(errors, 'e')
            if (typeof errors === 'object' && !Array.isArray(errors)){
                const errorMessages = Object.keys(errors.errors).map(key => errors.errors[key].join(' ')).join(' ');
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
        } else {
            setError('An unexpected error occurred. Please try again.');
        }
      setLoading(false);
      toast.error('Register failed. Please try again.');
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
               <InputField
                label="Full Name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                required
              />
              <ButtonNode type="submit" variant="primary">Daftar</ButtonNode>
              <p>Sudah punya akun? <Link to="/login">Login disini</Link>.</p>
            </Form>
          </Col>
        </Row>
      </Container>
      {loading && <Loading />}
    </>
  );
  
};

export default Register;
