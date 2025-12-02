import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdShortCard = ({ id, title, picture, location }) => (
  <Card className='h-100'>
    {picture && (
      <Card.Img
        variant='top'
        // src={`../../../public/uploads/${picture}`}
        src=''
        alt={title}
        style={{ objectFit: 'cover', height: 200 }}
      />
    )}
    <Card.Body className='d-flex flex-column'>
      <Card.Title>{title}</Card.Title>
      <Card.Text className='text-muted small'>
        {location || 'Location not specified'}
      </Card.Text>
      <div className='mt-auto'>
        <Button as={Link} to={`/ads/${id}`} variant='primary' className='w-100'>
          Read More
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default AdShortCard;
