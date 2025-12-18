const CookieConsent = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return React.createElement('div', {
    className: "fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800 p-6 shadow-2xl",
    role: "dialog",
    'aria-label': "Cookie consent"
  }, React.createElement('div', {
    className: "container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4"
  }, [
    React.createElement('div', {
      key: 'text',
      className: "flex-1"
    }, [
      React.createElement('p', {
        key: 'title',
        className: "text-white font-semibold mb-2"
      }, "We use cookies"),
      React.createElement('p', {
        key: 'description',
        className: "text-slate-400 text-sm"
      }, "This website uses cookies to enhance your experience and analyze site usage. By continuing, you agree to our use of cookies.")
    ]),
    React.createElement('div', {
      key: 'buttons',
      className: "flex gap-3"
    }, [
      React.createElement('button', {
        key: 'decline',
        onClick: handleDecline,
        className: "px-4 py-2 border border-slate-700 text-slate-300 rounded hover:border-slate-600 transition-colors"
      }, "Decline"),
      React.createElement('button', {
        key: 'accept',
        onClick: handleAccept,
        className: "px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500 transition-colors"
      }, "Accept")
    ])
  ]));
};
