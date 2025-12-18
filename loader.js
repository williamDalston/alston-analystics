// Module loader that fetches and executes the bundle
// Since bundle uses React.createElement, no Babel transformation needed
(async function() {
  try {
    const response = await fetch('bundle.js');
    const code = await response.text();
    
    // Execute directly (React.createElement is already valid JS)
    eval(code);
    
    // Wait a bit to ensure all components are loaded
    setTimeout(() => {
      const rootElement = document.getElementById('root');
      if (typeof AlstonAnalytics !== 'undefined') {
        if (ReactDOM.createRoot) {
          const root = ReactDOM.createRoot(rootElement);
          root.render(React.createElement(AlstonAnalytics));
        } else {
          ReactDOM.render(React.createElement(AlstonAnalytics), rootElement);
        }
      } else {
        console.error('AlstonAnalytics component not found');
      }
    }, 100);
  } catch (error) {
    console.error('Error loading bundle:', error);
  }
})();
