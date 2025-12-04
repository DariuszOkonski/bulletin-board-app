import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

// ...existing code...
const Navigation = () => (
  <Navbar bg='primary' variant='dark' expand='lg' className='mb-3'>
    <Container>
      <Navbar.Brand as={Link} to='/'>
        BulletinBoard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='main-navbar' />
      <Navbar.Collapse id='main-navbar'>
        <Nav className='me-auto'>
          <Nav.Link
            as={NavLink}
            to='/'
            end
            className={({ isActive }) => (isActive ? 'fw-bold' : '')}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/ads'
            className={({ isActive }) => (isActive ? 'fw-bold' : '')}
          >
            Ads
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/ads/new'
            className={({ isActive }) => (isActive ? 'fw-bold' : '')}
          >
            LOG Create Ad
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to='/about'
            className={({ isActive }) => (isActive ? 'fw-bold' : '')}
          >
            About
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to='/login'
            className={({ isActive }) => (isActive ? 'fw-bold' : '')}
          >
            Log In
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
