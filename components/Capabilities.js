const Capabilities = () => {
  const capabilities = [
    {
      icon: Database,
      title: "Data Engineering & Transformation",
      description: "We ingest data correctly, structure it intentionally, and establish clarity at the source. A solid foundation powering executive decisions."
    },
    {
      icon: Network,
      title: "Semantic Modeling & Metrics Design",
      description: "We encode business logic so metrics mean the same thing to everyone—always. One semantic layer creates a single, unified version of the truth."
    },
    {
      icon: Bot,
      title: "Agentic Analytics Automation",
      description: "We build agents that monitor pipelines, write commentary, and trigger actions—so your analytics stack behaves like a proactive partner, not just a static report."
    }
  ];

  return React.createElement('section', {
    id: "approach",
    className: "py-24 px-6 bg-slate-900 border-y border-slate-800"
  }, React.createElement('div', {
    className: "container mx-auto max-w-6xl"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "mb-16"
    }, [
      React.createElement('h2', {
        key: 'label',
        className: "text-sm font-bold text-sky-500 tracking-widest uppercase mb-3"
      }, "Capabilities"),
      React.createElement('h3', {
        key: 'title',
        className: "text-3xl md:text-4xl font-bold text-white"
      }, "We build the intelligence layer on top of your data.")
    ]),
    React.createElement('div', {
      key: 'grid',
      className: "grid md:grid-cols-3 gap-8"
    }, capabilities.map((cap, idx) => 
      React.createElement('div', {
        key: idx,
        className: "bg-slate-950 border border-slate-800 p-8 rounded hover:border-sky-900/50 transition-colors group"
      }, [
        React.createElement('div', {
          key: 'icon',
          className: "w-12 h-12 bg-slate-900 rounded flex items-center justify-center mb-6 group-hover:bg-slate-800 transition-colors border border-slate-800 group-hover:border-sky-900"
        }, React.createElement(cap.icon, { className: "text-sky-500", size: 24 })),
        React.createElement('h4', {
          key: 'title',
          className: "text-xl font-bold text-white mb-4"
        }, cap.title),
        React.createElement('p', {
          key: 'desc',
          className: "text-slate-400 leading-relaxed text-sm md:text-base"
        }, cap.description)
      ])
    ))
  ]));
};
