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
