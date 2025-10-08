import '@root/pico.pink.css';
import Header from './components/Header';
import UserSearch from './components/UserSearch';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState<string>('tom-ai');

  return (
    <>
      <Header />
      <UserSearch value={query} onChange={setQuery} />
    </>
  );
}

export default App;
