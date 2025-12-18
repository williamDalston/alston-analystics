const Contact = () => {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send to a backend
    console.log('Form submitted:', email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return React.createElement('section', {
    id: "contact",
    className: "py-24 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800"
  }, React.createElement('div', {
    className: "container mx-auto max-w-3xl text-center"
  }, [
    React.createElement('div', {
      key: 'icon',
      className: "w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-sky-500/20"
    }, React.createElement(Zap, { className: "text-sky-400 w-8 h-8" })),
    React.createElement('h2', {
      key: 'title',
      className: "text-4xl md:text-5xl font-bold text-white mb-6"
    }, [
      "Confidence comes from clarity.",
      React.createElement('br', { key: 'br1', className: "hidden md:block" }),
      React.createElement('span', {
        key: 'subtitle',
        className: "text-slate-500"
      }, "Build a system you can trust.")
    ]),
    React.createElement('div', {
      key: 'contact-info',
      className: "mt-8 mb-12 flex flex-wrap justify-center gap-8 text-slate-400"
    }, [
      React.createElement('a', {
        key: 'email',
        href: "mailto:contact@alstonanalytics.com",
        className: "flex items-center gap-2 hover:text-sky-400 transition-colors"
      }, [
        React.createElement(Mail, { key: 'icon', size: 18 }),
        "contact@alstonanalytics.com"
      ]),
      React.createElement('div', {
        key: 'location',
        className: "flex items-center gap-2"
      }, [
        React.createElement(MapPin, { key: 'icon', size: 18 }),
        "Washington, DC & Remote"
      ])
    ]),
    React.createElement('div', {
      key: 'form-container',
      className: "mt-12 p-8 bg-slate-950 border border-slate-800 rounded-lg max-w-lg mx-auto shadow-2xl"
    }, [
      React.createElement('h3', {
        key: 'form-title',
        className: "text-xl font-bold text-white mb-6"
      }, "Start with a conversation."),
      React.createElement('p', {
        key: 'form-desc',
        className: "text-slate-400 mb-8 text-sm"
      }, "No sales scripts. Just a technical discussion about your current analytics stack, your goals, and how agentic systems can help you scale."),
      React.createElement('form', {
        key: 'form',
        onSubmit: handleSubmit,
        className: "space-y-4 text-left"
      }, [
        React.createElement('div', { key: 'email-field' }, [
          React.createElement('label', {
            key: 'label',
            htmlFor: "email",
            className: "block text-xs font-bold text-slate-500 uppercase mb-2"
          }, "Email Address"),
          React.createElement('input', {
            key: 'input',
            type: "email",
            id: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            'aria-required': "true",
            'aria-describedby': "email-description",
            className: "w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-600",
            placeholder: "you@organization.com"
          }),
          React.createElement('span', {
            key: 'description',
            id: "email-description",
            className: "sr-only"
          }, "Enter your email address to request a call")
        ]),
        React.createElement('button', {
          key: 'submit',
          type: "submit",
          disabled: submitted,
          className: "w-full py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-sky-700 disabled:cursor-not-allowed text-white font-bold rounded transition-all shadow-[0_4px_14px_0_rgba(2,132,199,0.39)] flex items-center justify-center gap-2"
        }, submitted ? "Request Sent!" : [
          "Request a Call ",
          React.createElement(ArrowRight, { key: 'icon', size: 18 })
        ])
      ])
    ])
  ]));
};
