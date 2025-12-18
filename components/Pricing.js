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
