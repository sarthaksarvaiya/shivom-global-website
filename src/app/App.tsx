import React, { useEffect } from 'react';
import { HomePage } from '@/pages/HomePage';

export const App: React.FC = () => {
  useEffect(() => {
    // Allows query-string palette switching for stakeholder evaluation (e.g. ?palette=baseline or ?palette=heritage)
    const params = new URLSearchParams(window.location.search);
    const palette = params.get('palette');
    if (palette) {
      document.documentElement.setAttribute('data-palette', palette);
    }
  }, []);

  return <HomePage />;
};

export default App;
