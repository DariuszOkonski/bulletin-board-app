import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorModal from '../components/ErrorModal';
import FullPageSpinner from '../components/FullPageSpinner';
import PageTitle from '../components/PageTitle';
import useDeleteAd from '../hooks/useDeleteAd';
import useGetAdById from '../hooks/useGetAdById';
import useGetSession from '../hooks/useGetSession';
import { IMGS_URL } from '../utils/constants';

const SingleAd = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { id } = useParams();
  const { data: sessionData } = useGetSession();
  const isUserInStore = useSelector((state) => state.user);

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
  } = useDeleteAd(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (ad && sessionData && isUserInStore) {
      setIsLogged(ad.data.user.id === isUserInStore.data.data.user.id);
    }
  }, [ad, sessionData, isUserInStore]);

  if (isLoadingQuery || isLoadingMutate) {
    return <FullPageSpinner show />;
  }

  if (isErrorQuery || isErrorMutate) {
    const message = isErrorQuery
      ? 'Failed to query'
      : isErrorMutate
      ? 'Failed to mutate'
      : 'Failed to display ad';

    return (
      <ErrorModal
        show={isErrorQuery || isErrorMutate}
        title='Unable to load advertisement'
        message={message}
      />
    );
  }

  if (!ad) {
    return (
      <Container className='py-4'>
        <PageTitle title='Advertisement Not Found' />
      </Container>
    );
  }

  const adData = ad.data || ad;
  const user = adData.user || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    const ok = window.confirm('Are you sure you want to delete this item?');
    if (ok) {
      mutate(id);
      navigate('/ads');
    }
  };

  return (
    <Container className='py-4'>
      <Row className='mb-4'>
        <Col>
          <PageTitle title={adData.title} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className='w-100'>
            <Row className='g-0'>
              <Col md={6}>
                {adData.picture ? (
                  <Card.Img
                    src={IMGS_URL + adData.picture}
                    alt={adData.title}
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: 400,
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className='text-muted'>No image available</span>
                  </div>
                )}
              </Col>

              <Col md={6}>
                <Card.Body>
                  <Card.Text className='text-muted mb-3'>
                    <strong>Location:</strong>{' '}
                    {adData.user.location || 'Not specified'}
                  </Card.Text>

                  <Card.Text className='mb-4'>
                    <strong>Content:</strong> {adData.content}
                  </Card.Text>

                  <Card.Text className='mb-4'>
                    <strong>Price: </strong>{' '}
                    <strong className='display-6' style={{ color: '#28a745' }}>
                      {adData.price} PLN
                    </strong>
                  </Card.Text>

                  <hr />

                  <div className='mb-4'>
                    <h5 className='mb-3'>Seller Information</h5>
                    <Row className='align-items-center'>
                      <Col xs='auto'>
                        {adData.user.avatar ? (
                          <img
                            src={IMGS_URL + adData.user.avatar}
                            alt={user.login}
                            className='rounded-circle'
                            style={{
                              width: 60,
                              height: 60,
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div
                            className='rounded-circle bg-secondary'
                            style={{ width: 60, height: 60 }}
                          />
                        )}
                      </Col>
                      <Col>
                        <div className='mb-1'>
                          <strong>{user.login || 'Unknown'}</strong>
                        </div>
                        <div className='mb-0 text-muted'>
                          {user.phone || 'No phone provided'}
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <hr />

                  <Card.Text className='small text-muted'>
                    <span className='mb-1'>
                      <strong>Created:</strong>{' '}
                      {formatDate(adData.publicationDate)}
                    </span>
                    <br />
                    <span className='mb-0'>
                      <strong>Updated:</strong>{' '}
                      {formatDate(adData.updatedAt || adData.publicationDate)}
                    </span>
                  </Card.Text>

                  <Button as={Link} to='/ads' variant='primary' className='m-1'>
                    Back to Ads
                  </Button>

                  {isLogged && (
                    <>
                      <Button
                        as={Link}
                        to={`/ads/edit/${id}`}
                        variant='secondary'
                        className='m-1'
                      >
                        Edit Ad
                      </Button>

                      <Button
                        variant='danger'
                        className='m-1'
                        onClick={handleDelete}
                      >
                        Delete Ad
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleAd;
