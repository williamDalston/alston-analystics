const Header = ({ isMenuOpen, setIsMenuOpen, scrolled, scrollToSection }) => {
  return React.createElement('nav', {
    className: `fixed w-full z-50 transition-all duration-300 border-b ${
      scrolled
        ? 'bg-slate-950/90 backdrop-blur-md border-slate-800 py-4'
        : 'bg-transparent border-transparent py-6'
    }`
  }, [
    React.createElement('div', {
      key: 'container',
      className: "container mx-auto px-6 flex justify-between items-center"
    }, [
      React.createElement('button', {
        key: 'logo',
        onClick: () => scrollToSection('top'),
        className: "text-xl font-bold tracking-tighter text-white flex items-center gap-2 group",
        'aria-label': "Alston Analytics - Go to top"
      }, [
        React.createElement('div', {
          key: 'logo-box',
          className: "w-8 h-8 bg-sky-600 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(2,132,199,0.3)]"
        }, React.createElement('span', {
          className: "text-white font-bold text-lg"
        }, "A")),
        React.createElement('span', {
          key: 'logo-text',
          className: "group-hover:text-sky-400 transition-colors tracking-tight"
        }, "ALSTON ANALYTICS")
      ]),
      React.createElement('div', {
        key: 'desktop-menu',
        className: "hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
      }, [
        React.createElement('button', {
          key: 'approach',
          onClick: () => scrollToSection('approach'),
          className: "hover:text-sky-400 transition-colors",
          'aria-label': "Navigate to Approach section"
        }, "Approach"),
        React.createElement('button', {
          key: 'capabilities',
          onClick: () => scrollToSection('capabilities'),
          className: "hover:text-sky-400 transition-colors"
        }, "Capabilities"),
        React.createElement('button', {
          key: 'about',
          onClick: () => scrollToSection('about'),
          className: "hover:text-sky-400 transition-colors"
        }, "About"),
        React.createElement('button', {
          key: 'faq',
          onClick: () => scrollToSection('faq'),
          className: "hover:text-sky-400 transition-colors"
        }, "FAQ"),
        React.createElement('button', {
          key: 'contact',
          onClick: () => scrollToSection('contact'),
          className: "px-5 py-2 border border-slate-700 rounded hover:border-sky-500 hover:text-sky-400 transition-all text-white"
        }, "Contact")
      ]),
      React.createElement('button', {
        key: 'mobile-toggle',
        className: "md:hidden text-slate-100",
        onClick: () => setIsMenuOpen(!isMenuOpen),
        'aria-label': "Toggle menu"
      }, isMenuOpen ? React.createElement(X, { size: 24 }) : React.createElement(Menu, { size: 24 }))
    ]),
    isMenuOpen && React.createElement('div', {
      key: 'mobile-menu',
      className: "absolute top-full left-0 w-full bg-slate-950/95 border-b border-slate-800 py-6 px-6 md:hidden flex flex-col gap-4 shadow-2xl backdrop-blur-xl",
      role: "menu",
      'aria-label': "Mobile navigation menu"
    }, [
      React.createElement('button', {
        key: 'm-approach',
        onClick: () => scrollToSection('approach'),
        className: "text-left py-2 hover:text-sky-400"
      }, "Approach"),
      React.createElement('button', {
        key: 'm-capabilities',
        onClick: () => scrollToSection('capabilities'),
        className: "text-left py-2 hover:text-sky-400"
      }, "Capabilities"),
      React.createElement('button', {
        key: 'm-about',
        onClick: () => scrollToSection('about'),
        className: "text-left py-2 hover:text-sky-400"
      }, "About"),
      React.createElement('button', {
        key: 'm-faq',
        onClick: () => scrollToSection('faq'),
        className: "text-left py-2 hover:text-sky-400"
      }, "FAQ"),
      React.createElement('button', {
        key: 'm-contact',
        onClick: () => scrollToSection('contact'),
        className: "text-left py-2 text-sky-400 font-bold"
      }, "Contact Us")
    ])
  ]);
};
