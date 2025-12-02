import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='/ads' element={<h1>Ads</h1>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
