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
