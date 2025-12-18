
// ===== components/Icons.js =====
// Icon components with inline SVG
const Icon = ({ size = 24, children, className = "" }) => (
  React.createElement('svg', {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, children)
);

const ChevronRight = (props) => React.createElement(Icon, props, 
  React.createElement('polyline', { points: "9 18 15 12 9 6" })
);

const Database = (props) => React.createElement(Icon, props, [
  React.createElement('ellipse', { key: '1', cx: "12", cy: "5", rx: "9", ry: "3" }),
  React.createElement('path', { key: '2', d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
  React.createElement('path', { key: '3', d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
]);

const Network = (props) => React.createElement(Icon, props, [
  React.createElement('rect', { key: '1', x: "16", y: "16", width: "6", height: "6", rx: "1" }),
  React.createElement('rect', { key: '2', x: "2", y: "16", width: "6", height: "6", rx: "1" }),
  React.createElement('rect', { key: '3', x: "9", y: "2", width: "6", height: "6", rx: "1" }),
  React.createElement('path', { key: '4', d: "M5 16v-6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6" }),
  React.createElement('path', { key: '5', d: "M12 12V8" })
]);

const Bot = (props) => React.createElement(Icon, props, [
  React.createElement('rect', { key: '1', x: "3", y: "11", width: "18", height: "10", rx: "2" }),
  React.createElement('path', { key: '2', d: "M7 11V7a5 5 0 0 1 10 0v4" }),
  React.createElement('path', { key: '3', d: "M12 14v.01" }),
  React.createElement('path', { key: '4', d: "M8 14v.01" }),
  React.createElement('path', { key: '5', d: "M16 14v.01" })
]);

const ArrowRight = (props) => React.createElement(Icon, props, [
  React.createElement('line', { key: '1', x1: "5", y1: "12", x2: "19", y2: "12" }),
  React.createElement('polyline', { key: '2', points: "12 5 19 12 12 19" })
]);

const Menu = (props) => React.createElement(Icon, props, [
  React.createElement('line', { key: '1', x1: "3", y1: "6", x2: "21", y2: "6" }),
  React.createElement('line', { key: '2', x1: "3", y1: "12", x2: "21", y2: "12" }),
  React.createElement('line', { key: '3', x1: "3", y1: "18", x2: "21", y2: "18" })
]);

const X = (props) => React.createElement(Icon, props, [
  React.createElement('line', { key: '1', x1: "18", y1: "6", x2: "6", y2: "18" }),
  React.createElement('line', { key: '2', x1: "6", y1: "6", x2: "18", y2: "18" })
]);

const Terminal = (props) => React.createElement(Icon, props, [
  React.createElement('polyline', { key: '1', points: "4 17 10 11 4 5" }),
  React.createElement('line', { key: '2', x1: "12", y1: "19", x2: "20", y2: "19" })
]);

const BarChart3 = (props) => React.createElement(Icon, props, [
  React.createElement('line', { key: '1', x1: "12", y1: "20", x2: "12", y2: "10" }),
  React.createElement('line', { key: '2', x1: "18", y1: "20", x2: "18", y2: "4" }),
  React.createElement('line', { key: '3', x1: "6", y1: "20", x2: "6", y2: "16" })
]);

const Cpu = (props) => React.createElement(Icon, props, [
  React.createElement('rect', { key: '1', x: "4", y: "4", width: "16", height: "16", rx: "2", ry: "2" }),
  React.createElement('rect', { key: '2', x: "9", y: "9", width: "6", height: "6" }),
  React.createElement('line', { key: '3', x1: "9", y1: "1", x2: "9", y2: "4" }),
  React.createElement('line', { key: '4', x1: "15", y1: "1", x2: "15", y2: "4" }),
  React.createElement('line', { key: '5', x1: "9", y1: "20", x2: "9", y2: "23" }),
  React.createElement('line', { key: '6', x1: "15", y1: "20", x2: "15", y2: "23" }),
  React.createElement('line', { key: '7', x1: "20", y1: "9", x2: "23", y2: "9" }),
  React.createElement('line', { key: '8', x1: "20", y1: "14", x2: "23", y2: "14" }),
  React.createElement('line', { key: '9', x1: "1", y1: "9", x2: "4", y2: "9" }),
  React.createElement('line', { key: '10', x1: "1", y1: "14", x2: "4", y2: "14" })
]);

const ShieldCheck = (props) => React.createElement(Icon, props, [
  React.createElement('path', { key: '1', d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }),
  React.createElement('polyline', { key: '2', points: "9 12 11 14 15 10" })
]);

const Zap = (props) => React.createElement(Icon, props,
  React.createElement('polygon', { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
);

const Check = (props) => React.createElement(Icon, props,
  React.createElement('polyline', { points: "20 6 9 17 4 12" })
);

const Mail = (props) => React.createElement(Icon, props, [
  React.createElement('rect', { key: '1', x: "3", y: "5", width: "18", height: "14", rx: "2" }),
  React.createElement('polyline', { key: '2', points: "3 5 12 14 21 5" })
]);

const Phone = (props) => React.createElement(Icon, props,
  React.createElement('path', { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
);

const MapPin = (props) => React.createElement(Icon, props, [
  React.createElement('path', { key: '1', d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
  React.createElement('circle', { key: '2', cx: "12", cy: "10", r: "3" })
]);

const QuestionMarkCircle = (props) => React.createElement(Icon, props, [
  React.createElement('circle', { key: '1', cx: "12", cy: "12", r: "10" }),
  React.createElement('path', { key: '2', d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
  React.createElement('line', { key: '3', x1: "12", y1: "17", x2: "12.01", y2: "17" })
]);


// ===== utils/scroll.js =====
// Utility functions for scrolling and navigation
const scrollToSection = (id, setIsMenuOpen = null) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  }
};

const useScroll = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
};


// ===== components/Header.js =====
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


// ===== components/Hero.js =====
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


// ===== components/Problem.js =====
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


// ===== components/Capabilities.js =====
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


// ===== components/Comparison.js =====
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


// ===== components/AgenticSection.js =====
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


// ===== components/About.js =====
const About = () => {
  return React.createElement('section', {
    id: "about",
    className: "py-24 px-6 bg-slate-950"
  }, React.createElement('div', {
    className: "container mx-auto max-w-4xl"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "text-center mb-12"
    }, [
      React.createElement('h2', {
        key: 'title',
        className: "text-3xl md:text-4xl font-bold text-white mb-6"
      }, "Designed by an analyst who values precision."),
      React.createElement('p', {
        key: 'description',
        className: "text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
      }, "Alston Analytics was founded by Will Alston to bridge the gap between static dashboards and true decision intelligence. We help organizations move beyond manual reporting to build systems that are robust, automated, and deeply reliable.")
    ]),
    React.createElement('div', {
      key: 'content',
      className: "grid md:grid-cols-2 gap-12 items-center"
    }, [
      React.createElement('div', {
        key: 'left',
        className: "space-y-6"
      }, [
        React.createElement('h3', {
          key: 'subtitle',
          className: "text-xl font-semibold text-white mb-4"
        }, "Our Approach"),
        React.createElement('p', {
          key: 'p1',
          className: "text-slate-300 leading-relaxed"
        }, "We believe that analytics infrastructure should be self-documenting, self-validating, and self-explanatory. Every system we build is designed to reduce ambiguity and increase confidence in decision-making."),
        React.createElement('p', {
          key: 'p2',
          className: "text-slate-300 leading-relaxed"
        }, "Our focus on semantic modeling ensures that metrics have consistent definitions across your organization. Our automation agents handle routine monitoring and reporting, freeing your team to focus on strategic analysis.")
      ]),
      React.createElement('div', {
        key: 'right',
        className: "bg-slate-900 border border-slate-800 rounded-lg p-8"
      }, [
        React.createElement('div', {
          key: 'quote',
          className: "mb-6"
        }, [
          React.createElement('svg', {
            key: 'quote-icon',
            className: "w-8 h-8 text-sky-500 mb-4",
            fill: "currentColor",
            viewBox: "0 0 24 24"
          }, React.createElement('path', {
            d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
          })),
          React.createElement('p', {
            key: 'quote-text',
            className: "text-slate-300 leading-relaxed italic text-lg"
          }, "\"The solution wasn't just more dashboards. It was better systems—semantic models and automation that create certainty for decision makers.\""),
          React.createElement('p', {
            key: 'author',
            className: "text-slate-500 text-sm mt-4"
          }, "— Will Alston, Founder")
        ])
      ])
    ]),
    React.createElement('div', {
      key: 'values',
      className: "mt-12 pt-12 border-t border-slate-800"
    }, [
      React.createElement('h3', {
        key: 'values-title',
        className: "text-xl font-semibold text-white mb-6 text-center"
      }, "What We Value"),
      React.createElement('div', {
        key: 'values-list',
        className: "grid md:grid-cols-3 gap-6"
      }, [
        React.createElement('div', {
          key: 'value1',
          className: "text-center"
        }, [
          React.createElement('h4', {
            key: 'title',
            className: "text-white font-semibold mb-2"
          }, "Precision"),
          React.createElement('p', {
            key: 'desc',
            className: "text-slate-400 text-sm"
          }, "Every metric, every definition, every system is built with clarity and consistency in mind.")
        ]),
        React.createElement('div', {
          key: 'value2',
          className: "text-center"
        }, [
          React.createElement('h4', {
            key: 'title',
            className: "text-white font-semibold mb-2"
          }, "Automation"),
          React.createElement('p', {
            key: 'desc',
            className: "text-slate-400 text-sm"
          }, "We build systems that work for you, not systems you have to constantly maintain.")
        ]),
        React.createElement('div', {
          key: 'value3',
          className: "text-center"
        }, [
          React.createElement('h4', {
            key: 'title',
            className: "text-white font-semibold mb-2"
          }, "Reliability"),
          React.createElement('p', {
            key: 'desc',
            className: "text-slate-400 text-sm"
          }, "Your analytics infrastructure should be as trustworthy as the decisions it supports.")
        ])
      ])
    ])
  ]));
};


// ===== components/Testimonials.js =====
const Testimonials = () => {
  const testimonials = [
    {
      quote: "Alston Analytics transformed our Power BI infrastructure from a collection of disconnected reports into a unified, self-documenting system. The semantic layer they built ensures everyone in our organization is working with the same definitions.",
      author: "Director of Analytics",
      organization: "Public Sector Agency"
    },
    {
      quote: "The agentic automation they implemented saves our team hours every week. Instead of manually checking pipelines and writing routine reports, we can focus on strategic analysis.",
      author: "Chief Data Officer",
      organization: "Regulated Industry"
    },
    {
      quote: "Working with Alston Analytics was different. They didn't just build dashboards—they built systems. The governance framework they established gives us confidence in every metric we report.",
      author: "VP of Operations",
      organization: "Mid-Size Organization"
    }
  ];

  return React.createElement('section', {
    className: "py-24 px-6 bg-slate-950 border-y border-slate-800"
  }, React.createElement('div', {
    className: "container mx-auto max-w-6xl"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "text-center mb-16"
    }, [
      React.createElement('h2', {
        key: 'title',
        className: "text-3xl md:text-4xl font-bold text-white mb-4"
      }, "Trusted by organizations that value precision."),
      React.createElement('p', {
        key: 'subtitle',
        className: "text-slate-400 text-lg"
      }, "See what our clients say about working with us")
    ]),
    React.createElement('div', {
      key: 'testimonials',
      className: "grid md:grid-cols-3 gap-8"
    }, testimonials.map((testimonial, idx) => 
      React.createElement('div', {
        key: idx,
        className: "bg-slate-900 border border-slate-800 p-8 rounded-lg"
      }, [
        React.createElement('div', {
          key: 'quote',
          className: "mb-6"
        }, [
          React.createElement('svg', {
            key: 'quote-icon',
            className: "w-8 h-8 text-sky-500 mb-4",
            fill: "currentColor",
            viewBox: "0 0 24 24"
          }, React.createElement('path', {
            d: "M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
          })),
          React.createElement('p', {
            key: 'text',
            className: "text-slate-300 leading-relaxed italic"
          }, `"${testimonial.quote}"`)
        ]),
        React.createElement('div', {
          key: 'author',
          className: "border-t border-slate-800 pt-4"
        }, [
          React.createElement('p', {
            key: 'name',
            className: "text-white font-semibold"
          }, testimonial.author),
          React.createElement('p', {
            key: 'org',
            className: "text-slate-500 text-sm"
          }, testimonial.organization)
        ])
      ])
    ))
  ]));
};


// ===== components/Pricing.js =====
const Pricing = () => {
  const engagementTypes = [
    {
      title: "Assessment & Strategy",
      description: "Evaluate your current analytics infrastructure and design a roadmap for improvement.",
      duration: "2-4 weeks",
      deliverables: [
        "Current state analysis",
        "Gap assessment",
        "Strategic roadmap",
        "Implementation recommendations"
      ]
    },
    {
      title: "Implementation",
      description: "Build and deploy your analytics infrastructure with semantic models and automation.",
      duration: "8-16 weeks",
      deliverables: [
        "Data pipeline development",
        "Semantic model design",
        "Power BI workspace setup",
        "Automation agent deployment",
        "Documentation & training"
      ]
    },
    {
      title: "Ongoing Support",
      description: "Maintain and enhance your analytics systems as your needs evolve.",
      duration: "Ongoing",
      deliverables: [
        "System monitoring",
        "Performance optimization",
        "Feature enhancements",
        "Team support"
      ]
    }
  ];

  return React.createElement('section', {
    id: "pricing",
    className: "py-24 px-6 bg-slate-900"
  }, React.createElement('div', {
    className: "container mx-auto max-w-6xl"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "text-center mb-16"
    }, [
      React.createElement('h2', {
        key: 'title',
        className: "text-3xl md:text-4xl font-bold text-white mb-4"
      }, "Engagement Models"),
      React.createElement('p', {
        key: 'subtitle',
        className: "text-slate-400 text-lg max-w-2xl mx-auto"
      }, "We work with organizations of all sizes. Every engagement is customized to your specific needs and goals.")
    ]),
    React.createElement('div', {
      key: 'engagements',
      className: "grid md:grid-cols-3 gap-8 mb-12"
    }, engagementTypes.map((type, idx) => 
      React.createElement('div', {
        key: idx,
        className: "bg-slate-950 border border-slate-800 p-8 rounded-lg hover:border-sky-900/50 transition-colors"
      }, [
        React.createElement('h3', {
          key: 'title',
          className: "text-xl font-bold text-white mb-3"
        }, type.title),
        React.createElement('p', {
          key: 'desc',
          className: "text-slate-400 mb-4 text-sm"
        }, type.description),
        React.createElement('div', {
          key: 'duration',
          className: "mb-6 pb-6 border-b border-slate-800"
        }, React.createElement('span', {
          className: "text-sky-400 text-sm font-medium"
        }, `Duration: ${type.duration}`)),
        React.createElement('ul', {
          key: 'deliverables',
          className: "space-y-3"
        }, type.deliverables.map((item, itemIdx) => 
          React.createElement('li', {
            key: itemIdx,
            className: "flex items-start gap-3 text-slate-300 text-sm"
          }, [
            React.createElement(Check, {
              key: 'icon',
              size: 18,
              className: "text-sky-500 mt-0.5 flex-shrink-0"
            }),
            React.createElement('span', { key: 'text' }, item)
          ])
        ))
      ])
    )),
    React.createElement('div', {
      key: 'cta',
      className: "text-center p-8 bg-slate-950 border border-slate-800 rounded-lg"
    }, [
      React.createElement('p', {
        key: 'text',
        className: "text-slate-300 mb-6"
      }, "Pricing is customized based on your specific requirements, scope, and timeline."),
      React.createElement('button', {
        key: 'button',
        onClick: () => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        },
        className: "px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded transition-all shadow-[0_4px_14px_0_rgba(2,132,199,0.39)]"
      }, "Request a Custom Quote")
    ])
  ]));
};


// ===== components/FAQ.js =====
const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "What types of organizations do you work with?",
      answer: "We specialize in public sector and regulated industries where data governance, semantic clarity, and automated compliance are critical. Our systems are designed for organizations that need reliable, auditable analytics infrastructure."
    },
    {
      question: "How long does a typical engagement take?",
      answer: "Engagement timelines vary based on scope, but most projects range from 8-16 weeks for initial implementation. We work iteratively, delivering value in phases so you see results quickly while building toward a complete system."
    },
    {
      question: "Do you work with existing Power BI deployments?",
      answer: "Yes. We can enhance existing Power BI environments by introducing semantic modeling, governance frameworks, and automation. We also build new deployments from the ground up when needed."
    },
    {
      question: "What does 'agentic analytics' mean in practice?",
      answer: "Agentic systems monitor your data pipelines, validate metrics automatically, surface anomalies, and generate routine commentary. They act as proactive partners that handle routine monitoring so your team can focus on strategic analysis and decision-making."
    },
    {
      question: "How do you ensure data quality and governance?",
      answer: "We build semantic models that encode business logic at the data layer, ensuring metrics have consistent definitions. We implement validation rules, automated testing, and documentation that makes your analytics stack self-documenting and auditable."
    },
    {
      question: "What's included in a typical engagement?",
      answer: "Engagements typically include: data pipeline design and implementation, semantic model development, Power BI workspace architecture, automation agent deployment, documentation, and knowledge transfer to your team."
    }
  ];

  return React.createElement('section', {
    id: "faq",
    className: "py-24 px-6 bg-slate-900 border-y border-slate-800"
  }, React.createElement('div', {
    className: "container mx-auto max-w-4xl"
  }, [
    React.createElement('div', {
      key: 'header',
      className: "mb-12 text-center"
    }, [
      React.createElement('h2', {
        key: 'title',
        className: "text-3xl md:text-4xl font-bold text-white mb-4"
      }, "Frequently Asked Questions"),
      React.createElement('p', {
        key: 'subtitle',
        className: "text-slate-400 text-lg"
      }, "Common questions about our approach and services")
    ]),
    React.createElement('div', {
      key: 'faq-list',
      className: "space-y-4"
    }, faqs.map((faq, idx) => 
      React.createElement('div', {
        key: idx,
        className: "bg-slate-950 border border-slate-800 rounded-lg overflow-hidden"
      }, [
        React.createElement('button', {
          key: 'question',
          onClick: () => setOpenIndex(openIndex === idx ? null : idx),
          className: "w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-900 transition-colors",
          'aria-expanded': openIndex === idx,
          'aria-controls': `faq-answer-${idx}`
        }, [
          React.createElement('span', {
            key: 'text',
            className: "font-semibold text-white"
          }, faq.question),
          React.createElement(openIndex === idx ? X : ChevronRight, {
            key: 'icon',
            size: 20,
            className: `text-sky-400 transition-transform ${openIndex === idx ? 'rotate-90' : ''}`
          })
        ]),
        openIndex === idx && React.createElement('div', {
          key: 'answer',
          id: `faq-answer-${idx}`,
          className: "px-6 pb-4 text-slate-400 leading-relaxed"
        }, faq.answer)
      ])
    ))
  ]));
};


// ===== components/Contact.js =====
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


// ===== components/Footer.js =====
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


// ===== components/CookieConsent.js =====
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


// ===== app.js =====
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

