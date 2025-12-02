import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import ErrorModal from '../components/ErrorModal';
import { useState } from 'react';

const Home = () => {
  return (
    <div>
      <Row className='mb-4'>
        <Col>
          <h1 className='display-5'>Welcome to BulletinBoard</h1>
          <p className='lead'>
            Browse and post local ads — buy, sell and connect with your
            community.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button as={Link} to='/ads' variant='primary' className='me-2'>
            Browse Ads
          </Button>
          <Button as={Link} to='/ads/new' variant='secondary'>
            Create Ad
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
