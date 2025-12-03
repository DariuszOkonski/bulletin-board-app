import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import PageTitle from '../components/PageTitle';
import useCreateAd from '../hooks/useCreateAd';

const CreateAdd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState(null);

  const { data: ad, isLoading, isError, error } = useCreateAd();

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
    e.preventDefault();
    const missing = validate();
    if (missing.length) {
      alert({ message: `Missing or invalid fields: ${missing.join(', ')}` });
      return;
    }

    // TODO: get user when logged in
    const user = '69255294c692c3429e6cda2d';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('price', Number(price));
    if (picture) formData.append('picture', picture);

    console.group('Submit');
    console.log('formData: ', formData);
    console.log('title: ', title);
    console.log('content: ', content);
    console.log('price: ', price);
    console.log('pictureFile: ', picture);
    console.groupEnd();

    // try {
    //   const res = await fetch(`${API_URL}/ads`, {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (!res.ok) {
    //     const errText = await res.text();
    //     throw new Error(errText || `Server responded with ${res.status}`);
    //   }

    //   navigate('/ads');
    // } catch (err) {
    //   setError({ message: err instanceof Error ? err.message : String(err) });
    // } finally {
    //   setLoading(false);
    // }
  };

  if (isLoading) {
    return <FullPageSpinner show />;
  }

  if (isError) {
    return (
      <ErrorModal
        show={isError}
        title='Failed to create ad'
        message={error?.message || 'Unknown error'}
      />
    );
  }

  return (
    <Container className='py-4'>
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

export default CreateAdd;
