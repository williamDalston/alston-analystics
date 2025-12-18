const AgenticSection = () => {
  const features = [
    { icon: Terminal, text: "Power BI automation for reporting teams" },
    { icon: ShieldCheck, text: "Complex KPI & metric governance" },
    { icon: BarChart3, text: "Regulatory & public-sector analytics" },
    { icon: Cpu, text: "Internal \"analytics copilots\" for decision makers" }
  ];

  return React.createElement('section', {
    id: "capabilities",
    className: "py-24 px-6 bg-slate-900 relative overflow-hidden"
  }, [
    React.createElement('div', {
      key: 'bg',
      className: "absolute top-0 right-0 w-96 h-96 bg-sky-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
    }),
    React.createElement('div', {
      key: 'content',
      className: "container mx-auto max-w-6xl relative z-10"
    }, React.createElement('div', {
      className: "grid md:grid-cols-2 gap-16 items-center"
    }, [
      React.createElement('div', { key: 'left' }, [
        React.createElement('h2', {
          key: 'title',
          className: "text-3xl md:text-4xl font-bold text-white mb-6"
        }, "Amplify your team's expertise."),
        React.createElement('p', {
          key: 'p1',
          className: "text-lg text-slate-400 mb-4"
        }, "Agentic analytics systems handle the \"what\" and \"why\" of routine monitoring, freeing your analysts to focus on the \"now what.\""),
        React.createElement('p', {
          key: 'p2',
          className: "text-lg text-slate-400 mb-8"
        }, "Agents monitor pipelines, validate assumptions, surface anomalies, and draft routine answers so your team can focus on strategy and judgment."),
        React.createElement('ul', {
          key: 'list',
          className: "space-y-4"
        }, features.map((feature, idx) => 
          React.createElement('li', {
            key: idx,
            className: "flex items-center gap-3 text-slate-300"
          }, [
            React.createElement(feature.icon, {
              key: 'icon',
              size: 20,
              className: "text-sky-500"
            }),
            React.createElement('span', { key: 'text' }, feature.text)
          ])
        ))
      ]),
      React.createElement('div', {
        key: 'right',
        className: "bg-slate-950 border border-slate-800 rounded-lg p-6 shadow-2xl relative"
      }, [
        React.createElement('div', {
          key: 'window',
          className: "flex gap-2 mb-4 border-b border-slate-800 pb-4"
        }, [
          React.createElement('div', { key: '1', className: "w-3 h-3 rounded-full bg-slate-700" }),
          React.createElement('div', { key: '2', className: "w-3 h-3 rounded-full bg-slate-700" }),
          React.createElement('div', { key: '3', className: "w-3 h-3 rounded-full bg-slate-700" })
        ]),
        React.createElement('div', {
          key: 'code',
          className: "font-mono text-sm space-y-4"
        }, [
          React.createElement('div', { key: '1', className: "text-slate-500" }, "$ system check --status"),
          React.createElement('div', { key: '2', className: "text-emerald-400" }, "✓ Ingestion Pipelines: Active"),
          React.createElement('div', { key: '3', className: "text-emerald-400" }, "✓ Semantic Model: Validated"),
          React.createElement('div', { key: '4', className: "text-slate-500" }, "$ agent run --task \"analyze_variance\""),
          React.createElement('div', { key: '5', className: "text-sky-400" }, "Running analysis..."),
          React.createElement('div', {
            key: '6',
            className: "pl-4 text-slate-300 border-l-2 border-slate-800"
          }, [
            "Detected 12% drift in Q3 OpEx.",
            React.createElement('br', { key: 'br1' }),
            "Primary driver: Contractor spend in Region B.",
            React.createElement('br', { key: 'br2' }),
            "Action: Flagging for Finance review."
          ]),
          React.createElement('div', { key: '7', className: "text-sky-500 animate-pulse" }, "_")
        ])
      ])
    ]))
  ]);
};
