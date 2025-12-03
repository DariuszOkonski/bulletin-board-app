import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <Container className='py-5'>
    <Row className='justify-content-center'>
      <Col md={8} lg={6}>
        <Card className='text-center'>
          <Card.Body>
            <Card.Title className='display-6 mb-3'>
              404 — Page Not Found
            </Card.Title>
            <Card.Text className='mb-4 text-muted'>
              The page you are looking for does not exist or has been moved.
              Please check the URL or return to the home page.
            </Card.Text>
            <Button as={Link} to='/' variant='primary'>
              Go to Home
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default ErrorPage;
