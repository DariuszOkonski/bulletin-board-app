import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import useGetAdById from '../hooks/useGetAdById';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import PageTitle from '../components/PageTitle';

const SingleAd = () => {
  const { id } = useParams();
  const { data: ad, isLoading, isError, error } = useGetAdById(id);

  if (isLoading) {
    return <FullPageSpinner show />;
  }

  if (isError) {
    return (
      <ErrorModal
        show={isError}
        title='Unable to load advertisement'
        message={
          error instanceof Error ? error.message : 'Failed to load ad details'
        }
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
  const userAvatar = user.avatar
    ? user.avatar.startsWith('http')
      ? user.avatar
      : `/uploads/${user.avatar}`
    : null;
  const adPicture = adData.picture
    ? adData.picture.startsWith('http')
      ? adData.picture
      : `/uploads/${adData.picture}`
    : null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
                {adPicture ? (
                  <Card.Img
                    src={adPicture}
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
                        {userAvatar ? (
                          <img
                            src={userAvatar}
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

                  <Button
                    as={Link}
                    to='/ads'
                    variant='outline-primary'
                    className='mt-4'
                  >
                    Back to Ads
                  </Button>

                  <Button
                    as={Link}
                    to='/ads'
                    variant='outline-primary'
                    className='mt-4'
                  >
                    LOG Edit Ad
                  </Button>

                  <Button
                    as={Link}
                    to='/ads'
                    variant='outline-primary'
                    className='mt-4'
                  >
                    LOG Delete Ad
                  </Button>
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
