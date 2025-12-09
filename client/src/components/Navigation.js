import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const isLogged = useSelector((state) => state.isAuthenticated);

  return (
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
            {isLogged && (
              <Nav.Link
                as={NavLink}
                to='/ads/new'
                className={({ isActive }) => (isActive ? 'fw-bold' : '')}
              >
                Create Ad
              </Nav.Link>
            )}
            <Nav.Link
              as={NavLink}
              to='/about'
              className={({ isActive }) => (isActive ? 'fw-bold' : '')}
            >
              About
            </Nav.Link>
          </Nav>

          <hr
            className='w-100 my-2 d-lg-none border-secondary'
            style={{ opacity: 1 }}
          />

          <Nav className='ms-auto'>
            {!isLogged && (
              <>
                <Nav.Link
                  as={NavLink}
                  to='/login'
                  className={({ isActive }) => (isActive ? 'fw-bold' : '')}
                >
                  Sign in
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to='/register'
                  className={({ isActive }) => (isActive ? 'fw-bold' : '')}
                >
                  Sign up
                </Nav.Link>
              </>
            )}

            {isLogged && (
              <Nav.Link
                as={NavLink}
                to='/logout'
                className={({ isActive }) => (isActive ? 'fw-bold' : '')}
              >
                Sign out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
