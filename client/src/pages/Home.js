import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            LOG Create Ad
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
