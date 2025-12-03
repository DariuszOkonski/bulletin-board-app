import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const SearchAds = ({ onSetSearchBy }) => {
  const [q, setQ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSetSearchBy(q.trim());
  };

  const handleClear = () => {
    setQ('');
  };

  return (
    <Form onSubmit={handleSubmit} className='mb-3'>
      <InputGroup>
        <Form.Control
          placeholder='Search ads by title...'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button type='submit' variant='primary'>
          Search
        </Button>
        <Button type='button' variant='outline-secondary' onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchAds;
