const Problem = () => {
  return React.createElement('section', {
    className: "py-24 px-6 bg-slate-950"
  }, React.createElement('div', {
    className: "container mx-auto max-w-4xl"
  }, React.createElement('div', {
    className: "border-l-4 border-sky-600 pl-8 md:pl-12 py-2"
  }, [
    React.createElement('h2', {
      key: 'title',
      className: "text-3xl md:text-4xl font-bold text-white mb-6"
    }, "True insight requires more than just a dashboard."),
    React.createElement('p', {
      key: 'p1',
      className: "text-lg text-slate-400 mb-4 leading-relaxed"
    }, "As organizations scale, dashboards often fall behind. Definitions drift, metrics become ambiguous, and analysts spend more time explaining the data than analyzing it."),
    React.createElement('p', {
      key: 'p2',
      className: "text-lg text-slate-400 mb-8 leading-relaxed"
    }, "When the system is built correctly, the data doesn't just sit there. It monitors itself. It validates itself. And it explains itself."),
    React.createElement('p', {
      key: 'p3',
      className: "text-xl md:text-2xl font-semibold text-white"
    }, [
      "The goal isn't just visualization.",
      React.createElement('br', { key: 'br', className: "hidden md:block" }),
      "The goal is a ",
      React.createElement('span', {
        key: 'highlight',
        className: "text-sky-400"
      }, "self-sustaining intelligence layer"),
      "."
    ])
  ])));
};
