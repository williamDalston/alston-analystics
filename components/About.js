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
