import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../components/ErrorModal';
import FullPageSpinner from '../components/FullPageSpinner';
import PageTitle from '../components/PageTitle';
import useLogin from '../hooks/useLogin';
import { setUser } from '../store/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorData, setIsErrorData] = useState(false);

  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isAuthenticated);

  const { data, mutate, isLoading, isError, error } = useLogin();
  const handleCancel = () => navigate('/');

  useEffect(() => {
    setIsErrorData(isError);
  }, [isError]);

  useEffect(() => {
    if (data?.success) {
      dispatch(setUser({ data }));
      navigate('/ads');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    setIsErrorData(false);
    e.preventDefault();

    if (!login.trim() || !password) {
      setIsErrorData(true);
      return;
    }

    mutate({ login, password });
  };

  if (isLogged) {
    navigate('/');
  }

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
