import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdShortCard = ({ id, title, picture, location, author }) => {
  // TODO: fix src later on
  const src = picture
    ? picture.startsWith('http')
      ? picture
      : `/uploads/${picture}`
    : null;

  return (
    <Card className='w-100 mb-3'>
      <Card.Body>
        <Row className='align-items-center'>
          <Col xs={12} md={4} lg={4} className='mb-2 mb-md-0'>
            {src ? (
              <img
                src={src}
                alt={title}
                className='img-fluid rounded'
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 140,
                  backgroundColor: '#e9ecef',
                  borderRadius: 6,
                }}
              />
            )}
          </Col>

          <Col xs={12} md={5} lg={6} className='mb-2 mb-md-0'>
            <h5 className='mb-1'>{title}</h5>
            <p className='text-muted mb-0'>
              <strong>Location:</strong> {location || 'Location not specified'}
            </p>
            <p className='text-muted mb-0'>
              <strong>Author:</strong> {author || 'Author not specified'}
            </p>
          </Col>

          <Col xs={12} md={3} lg={2} className='text-md-end mt-3 mt-md-0'>
            <Button as={Link} to={`/ads/${id}`} variant='primary'>
              Read More
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AdShortCard;
