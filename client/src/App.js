import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Ads from './pages/Ads';
import ErrorPage from './pages/ErrorPage';
import About from './pages/About';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navigation />

        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ads' element={<Ads />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
