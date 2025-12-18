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
