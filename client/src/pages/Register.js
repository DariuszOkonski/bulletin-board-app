import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import useRegisterUser from '../hooks/useRegisterUser';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isErrorData, setIsErrorData] = useState(false);

  const dispatch = useDispatch();

  const {
    data: user,
    mutate,
    isLoading: isLoadingMutate,
    isError: isErrorMutate,
    error: errorMutate,
  } = useRegisterUser();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user.data));
      navigate('/ads');
    }
  }, [user]);

  const handleCancel = () => navigate('/');

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    setIsErrorData(false);
    e.preventDefault();
    // setError(null);

    const missing = [];
    if (!login.trim()) missing.push('login');
    if (!password) missing.push('password');
    if (!phone.trim()) missing.push('phone');
    if (!location.trim()) missing.push('location');
    if (!avatar) missing.push('avatar');

    if (missing.length) {
      // console.log('missing length: ', missing.length);
      // throw new Error(`Missing required fields: ${missing.join(', ')}`);
      setIsErrorData(true);
      return;
    }

    mutate({ login, password, phone, location, avatar });

    // navigate('/ads');
  };

  // if (isLoadingMutate) {
  //   return <FullPageSpinner show={isLoadingMutate} />;
  // }

  // if (isErrorMutate || isErrorData) {
  //   return (
  //     <ErrorModal
  //       show={isErrorMutate || isErrorData}
  //       title='Registration failed'
  //       message={errorMutate?.message || 'Unable to register'}
  //     />
  //   );
  // }

  return (
    <Container className='py-5'>
      {isLoadingMutate && <FullPageSpinner show={isLoadingMutate} />}
      {(isErrorMutate || isErrorData) && (
        <ErrorModal
          show={isErrorMutate || isErrorData}
          title='Registration failed'
          message={errorMutate?.message || 'Unable to register'}
          shouldRedirect={false}
          setIsShown={setIsErrorData}
        />
      )}

      <Row className='justify-content-center'>
        <Col md={6}>
          <PageTitle title='Sign Up' />
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
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

            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone number'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder='City, Country'
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='avatar'>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
            </Form.Group>

            <div className='d-flex'>
              <Button type='submit' variant='primary' className='me-2'>
                Sign up
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

export default Register;
