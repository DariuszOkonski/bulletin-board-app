import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import PageTitle from '../components/PageTitle';
import useLogin from '../hooks/useLogin';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorData, setIsErrorData] = useState(false);

  const dispatch = useDispatch();

  const { data, mutate, isLoading, isError, error } = useLogin();
  const handleCancel = () => navigate('/');

  useEffect(() => {
    setIsErrorData(isError);
  }, [isError]);

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser({ login }));
      navigate('/ads');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    setIsErrorData(false);
    e.preventDefault();
    // setError(null);

    if (!login.trim() || !password) {
      setIsErrorData(true);
      return;
    }

    mutate({ login, password });

    // navigate('/ads');
  };

  // if(isLoading) {
  //   return <FullPageSpinner show={isLoading} />
  // }

  // if(isError) {
  // return;
  // <ErrorModal
  //   show={!!error}
  //   title='Login failed'
  //   message={error?.message || 'Unable to login'}
  //   onClose={() => setError(null)}
  // />
  // }

  return (
    <Container className='py-5'>
      {isLoading && <FullPageSpinner show={isLoading} />}
      {isErrorData && (
        <ErrorModal
          show={isErrorData}
          title='Login failed'
          message={error?.message || 'Unable to login'}
          setIsShown={setIsErrorData}
          shouldRedirect={false}
        />
      )}
      <Row className='justify-content-center'>
        <Col md={6}>
          <PageTitle title='Sign In' />
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='login'>
              <Form.Label>Login</Form.Label>
              <Form.Control
                type='text'
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder='Enter login'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
              />
            </Form.Group>

            <div className='d-flex'>
              <Button type='submit' variant='primary' className='me-2'>
                Sign in
              </Button>
              <Button variant='secondary' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
