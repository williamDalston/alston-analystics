// Main App Component
const AlstonAnalytics = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const scrolled = useScroll();

  const handleScrollToSection = (id) => {
    scrollToSection(id, setIsMenuOpen);
  };

  return React.createElement('div', {
    className: "min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-sky-900 selection:text-sky-50"
  }, [
    React.createElement(Header, {
      key: 'header',
      isMenuOpen: isMenuOpen,
      setIsMenuOpen: setIsMenuOpen,
      scrolled: scrolled,
      scrollToSection: handleScrollToSection
    }),
    React.createElement(Hero, {
      key: 'hero',
      scrollToSection: handleScrollToSection
    }),
    React.createElement(Problem, { key: 'problem' }),
    React.createElement(Capabilities, { key: 'capabilities' }),
    React.createElement(Comparison, { key: 'comparison' }),
    React.createElement(AgenticSection, { key: 'agentic' }),
    React.createElement(About, { key: 'about' }),
    React.createElement(Testimonials, { key: 'testimonials' }),
    React.createElement(Pricing, { key: 'pricing' }),
    React.createElement(FAQ, { key: 'faq' }),
    React.createElement(Contact, { key: 'contact' }),
    React.createElement(Footer, {
      key: 'footer',
      scrollToSection: handleScrollToSection
    }),
    React.createElement(CookieConsent, { key: 'cookies' })
  ]);
};
