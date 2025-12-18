const Hero = ({ scrollToSection }) => {
  return React.createElement('section', {
    id: "top",
    className: "relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 border-b border-slate-800 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950"
  }, [
    React.createElement('div', {
      key: 'container',
      className: "container mx-auto max-w-5xl"
    }, [
      React.createElement('div', {
        key: 'badge',
        className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-mono mb-8 shadow-sm"
      }, [
        React.createElement('div', {
          key: 'pulse',
          className: "w-2 h-2 rounded-full bg-sky-500 animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.5)]"
        }),
        "AGENTIC ANALYTICS & POWER BI"
      ]),
      React.createElement('h1', {
        key: 'title',
        className: "text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6"
      }, [
        "Analytics systems",
        React.createElement('br', { key: 'br1' }),
        "that ",
        React.createElement('span', {
          key: 'highlight',
          className: "text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"
        }, "anticipate the question"),
        "."
      ]),
      React.createElement('p', {
        key: 'description',
        className: "text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed mb-10"
      }, "Alston Analytics designs intelligent infrastructure that turns Power BI into a proactive decision layer: governed metrics, semantic models, and automation that deliver clarity before anyone has to ask."),
      React.createElement('div', {
        key: 'cta-buttons',
        className: "flex flex-col sm:flex-row gap-4"
      }, [
        React.createElement('button', {
          key: 'primary',
          onClick: () => scrollToSection('approach'),
          className: "px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded shadow-[0_4px_14px_0_rgba(2,132,199,0.39)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
        }, [
          "See How It Works ",
          React.createElement(ChevronRight, { key: 'icon', size: 18 })
        ]),
        React.createElement('button', {
          key: 'secondary',
          onClick: () => scrollToSection('contact'),
          className: "px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium rounded transition-colors flex items-center justify-center gap-2"
        }, "Book a Technical Conversation")
      ]),
      React.createElement('div', {
        key: 'tags',
        className: "mt-12 pt-8 border-t border-slate-900 flex flex-wrap gap-6 text-xs text-slate-500 font-medium uppercase tracking-wider"
      }, [
        React.createElement('span', {
          key: 'tag1',
          className: "flex items-center gap-2"
        }, [
          React.createElement('div', {
            key: 'dot1',
            className: "w-1 h-1 bg-slate-500 rounded-full"
          }),
          "Semantic Modeling"
        ]),
        React.createElement('span', {
          key: 'tag2',
          className: "flex items-center gap-2"
        }, [
          React.createElement('div', {
            key: 'dot2',
            className: "w-1 h-1 bg-slate-500 rounded-full"
          }),
          "Public Sector Standard"
        ]),
        React.createElement('span', {
          key: 'tag3',
          className: "flex items-center gap-2"
        }, [
          React.createElement('div', {
            key: 'dot3',
            className: "w-1 h-1 bg-slate-500 rounded-full"
          }),
          "Agentic Automation"
        ])
      ])
    ]),
    React.createElement('div', {
      key: 'grid',
      className: "absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-1]"
    })
  ]);
};
