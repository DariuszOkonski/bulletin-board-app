import { Container } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../pages/Home';
import Ads from '../pages/Ads';
import ErrorPage from '../pages/ErrorPage';
import About from '../pages/About';
import SingleAd from '../pages/SingleAd';
import CreateAd from '../pages/CreateAd';
import EditAd from '../pages/EditAd';
import Login from '../pages/Login';
import Register from '../pages/Register';

function Content() {
  return (
    <BrowserRouter>
      <Navigation />

      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ads' element={<Ads />} />
          <Route path='/ads/new' element={<CreateAd />} />
          <Route path='/ads/:id' element={<SingleAd />} />
          <Route path='/ads/edit/:id' element={<EditAd />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Content;
