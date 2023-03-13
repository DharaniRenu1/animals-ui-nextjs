import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}


function  Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Form>
      <Form.Control type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
    </Form>
  );
};

export default Search;