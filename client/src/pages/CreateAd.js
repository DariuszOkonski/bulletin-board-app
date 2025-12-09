import React, { use, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import PageTitle from '../components/PageTitle';
import useCreateAd from '../hooks/useCreateAd';
import { useEffect } from 'react';
import useGetSession from '../hooks/useGetSession';

const CreateAd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState(null);
  const [user, setUser] = useState('');
  const [isErrorData, setIsErrorData] = useState(false);

  const { mutate, isLoading, isError, error } = useCreateAd();
  const { data: userData } = useGetSession();

  useEffect(() => {
    setIsErrorData(isError);
  }, [isError]);

  useEffect(() => {
    if (userData) {
      setUser(userData.data.id);
    }
  }, [userData]);

  const onFileChange = (e) => {
    setPicture(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  const validate = () => {
    const missing = [];
    if (!title.trim()) missing.push('title');
    if (!content.trim()) missing.push('content');
    if (!price.toString().trim() || Number.isNaN(Number(price)))
      missing.push('price');
    return missing;
  };

  const handleSubmit = async (e) => {
    setIsErrorData(false);
    e.preventDefault();
    const missing = validate();
    if (missing.length) {
      setIsErrorData(true);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', Number(price));
    if (picture) formData.append('picture', picture);
    formData.append('user', user);

    mutate(formData, {
      onSuccess: () => navigate('/ads'),
    });
  };

  return (
    <Container className='py-4'>
      {isLoading && <FullPageSpinner show />}
      {isErrorData && (
        <ErrorModal
          show={isErrorData}
          title='Failed to create ad'
          message={error?.message || 'Unknown error'}
          shouldRedirect={false}
          setIsShown={setIsErrorData}
        />
      )}
      <Row className='mb-4'>
        <Col>
          <PageTitle title='Create Advertisement' />
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit} encType='multipart/form-data'>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter title'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='content'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as='textarea'
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Describe your item...'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder='Price'
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='picture'>
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                onChange={onFileChange}
              />
            </Form.Group>

            <div className='d-flex'>
              <Button type='submit' variant='primary' className='me-2'>
                Create
              </Button>
              <Button variant='secondary' onClick={() => navigate('/')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAd;
