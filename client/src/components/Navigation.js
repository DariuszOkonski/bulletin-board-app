import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => (
  <Navbar bg='primary' variant='dark' expand='lg' className='mb-3'>
    <Container>
      <Navbar.Brand as={Link} to='/'>
        BulletinBoard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='main-navbar' />
      <Navbar.Collapse id='main-navbar'>
        <Nav className='me-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/about'>
            About
          </Nav.Link>
          <Nav.Link as={Link} to='/ads'>
            Ads
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
