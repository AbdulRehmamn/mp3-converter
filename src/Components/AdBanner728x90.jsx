import { useEffect } from 'react';

const AdBanner728x90 = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.highperformanceformat.com/f6f9e11596bab286d4a3a44b638789ee/invoke.js';
    script.async = true;

    const container = document.getElementById('ad-container');
    if (container) {
      container.innerHTML = ''; // clear previous ads
      container.appendChild(script);
    }
  }, []);

  return (
    <div
      id="ad-container"
      style={{
        width: '728px',
        height: '90px',
        margin: '20px auto',
        textAlign: 'center',
      }}
    ></div>
  );
};

export default AdBanner728x90;