import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorModal from '../components/ErrorModal';
import FullPageSpinner from '../components/FullPageSpinner';
import PageTitle from '../components/PageTitle';
import useGetAdById from '../hooks/useGetAdById';
import useEditAd from '../hooks/useEditAd';
import useGetSession from '../hooks/useGetSession';

const EditAd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState(null);
  const [user, setUser] = useState('');
  const [isErrorData, setIsErrorData] = useState(false);

  const { id } = useParams();
  const { data: userData } = useGetSession();

  const {
    data: ad,
    isLoading: isLoadingQuery,
    isError: isErrorQuery,
    error: errorQuery,
  } = useGetAdById(id);
  const {
    mutate,
    isLoading: isLoadingMutate,
    isError: isErrorMutate,
    error: errorMutate,
  } = useEditAd(id);

  useEffect(() => {
    if (ad) {
      setTitle(ad.data.title);
      setContent(ad.data.content);
      setPrice(ad.data.price);

      // TODO: fix issue with setting picture
      // setPicture(ad.data.picture);
    }
  }, [ad]);

  useEffect(() => {
    setIsErrorData(isErrorQuery || isErrorMutate);
  }, [isErrorMutate, isErrorQuery]);

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
      onSuccess: () => navigate(`/ads/${id}`),
    });
  };

  return (
    <Container className='py-4'>
      {(isLoadingMutate || isLoadingQuery) && <FullPageSpinner show />}
      {isErrorData && (
        <ErrorModal
          show={isErrorData}
          title={title}
          message={errorQuery.message || errorMutate.message || 'Unknown error'}
        />
      )}
      <Row className='mb-4'>
        <Col>
          <PageTitle title='Edit Advertisement' />
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
                Update
              </Button>
              <Button
                variant='secondary'
                onClick={() => navigate(`/ads/${id}`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAd;
