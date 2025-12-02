import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoAdsFound = () => (
  <Container className='py-5'>
    <Row className='justify-content-center'>
      <Col md={6}>
        <Card className='text-center'>
          <Card.Body className='p-5'>
            <Card.Title className='mb-3'>No Ads Found</Card.Title>
            <Card.Text className='text-muted mb-4'>
              Sorry, we couldn't find any advertisements matching your search.
              Try adjusting your search criteria or browse all ads.
            </Card.Text>
            <Button as={Link} to='/' variant='primary'>
              Back to Home
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default NoAdsFound;
