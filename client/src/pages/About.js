import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => (
  <Container className='py-5'>
    <Row className='justify-content-center'>
      <Col md={8} lg={6}>
        <Card className='text-center'>
          <Card.Body>
            <Card.Title className='display-6 mb-3'>About This App</Card.Title>
            <Card.Text className='mb-3 text-muted'>
              A simple bulletin board application for posting and browsing local
              advertisements.
            </Card.Text>

            <div className='text-start mb-4'>
              <p className='mb-1'>
                <strong>Author:</strong> Dariusz Okonski
              </p>
              <p className='mb-1'>
                <strong>Version:</strong> 1.0.0
              </p>
            </div>

            <Button as={Link} to='/' variant='primary'>
              Go to Home
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default About;
