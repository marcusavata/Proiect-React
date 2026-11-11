import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'; 

import Navbar from './Navbar';
import Home from './Home';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/profile" element={<div style={{color: 'white', padding: '2rem'}}>Pagina Profile - in constructie</div>} />
      </Routes>
    </>
  );
}

export default App;