const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return React.createElement('footer', {
    className: "py-12 px-6 bg-slate-950 border-t border-slate-900"
  }, React.createElement('div', {
    className: "container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4"
  }, [
    React.createElement('div', {
      key: 'copyright'
    }, `© ${currentYear} Alston Analytics. All rights reserved.`),
    React.createElement('div', {
      key: 'links',
      className: "flex flex-wrap items-center gap-6"
    }, [
      React.createElement('a', {
        key: 'linkedin',
        href: "https://linkedin.com/company/alstonanalytics",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "hover:text-sky-400 transition-colors"
      }, "LinkedIn"),
      React.createElement('button', {
        key: 'contact',
        onClick: () => scrollToSection('contact'),
        className: "hover:text-sky-400 transition-colors"
      }, "Contact"),
      React.createElement('a', {
        key: 'privacy',
        href: "/privacy-policy.html",
        className: "hover:text-sky-400 transition-colors"
      }, "Privacy Policy"),
      React.createElement('a', {
        key: 'terms',
        href: "/terms-of-service.html",
        className: "hover:text-sky-400 transition-colors"
      }, "Terms of Service"),
      React.createElement('span', {
        key: 'divider',
        className: "hidden md:inline text-slate-700"
      }, "|"),
      React.createElement('span', {
        key: 'location',
        className: "text-slate-600"
      }, "Washington, DC & Remote")
    ])
  ]));
};
