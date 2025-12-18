const Comparison = () => {
  const comparisons = [
    { standard: "Dashboards first", alston: "Semantics first" },
    { standard: "Manual refresh cycles", alston: "Autonomous pipelines" },
    { standard: "One-off reports", alston: "Living systems" },
    { standard: "Analyst-dependent", alston: "Agent-augmented" },
    { standard: "Visuals explain the data", alston: "Data speaks for itself" }
  ];

  return React.createElement('section', {
    className: "py-24 px-6 bg-slate-950"
  }, React.createElement('div', {
    className: "container mx-auto max-w-5xl"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "text-center mb-16"
    }, React.createElement('h2', {
      className: "text-3xl md:text-4xl font-bold text-white"
    }, "A systems-first approach to analytics.")),
    React.createElement('div', {
      key: 'table',
      className: "overflow-x-auto"
    }, React.createElement('table', {
      className: "w-full text-left border-collapse text-sm md:text-base"
    }, [
      React.createElement('thead', { key: 'thead' }, React.createElement('tr', {}, [
        React.createElement('th', {
          key: 'th1',
          className: "p-4 border-b border-slate-800 text-slate-500 font-medium w-1/2"
        }, "The Standard Approach"),
        React.createElement('th', {
          key: 'th2',
          className: "p-4 border-b border-sky-900 bg-sky-950/10 text-sky-400 font-bold w-1/2"
        }, "Alston Analytics")
      ])),
      React.createElement('tbody', {
        key: 'tbody',
        className: "divide-y divide-slate-800"
      }, comparisons.map((comp, idx) => 
        React.createElement('tr', { key: idx }, [
          React.createElement('td', {
            key: 'standard',
            className: "p-4 text-slate-400"
          }, comp.standard),
          React.createElement('td', {
            key: 'alston',
            className: "p-4 text-white font-medium bg-sky-950/5"
          }, comp.alston)
        ])
      ))
    ]))
  ]));
};
