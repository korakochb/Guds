import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const backgroundStyle = {
    background: isDarkMode ? "#444444" : "#f7f7f7",
    minHeight: '100vh',
  };

  return (
    <div className="font-tumb" style={backgroundStyle}>
      <Navbar isDarkMode={isDarkMode} />
      <Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
}

export default App;
