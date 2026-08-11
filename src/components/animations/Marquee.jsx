export default function Marquee({ items, speed = 30, className = "" }) {
  const doubled = [...items, ...items];

  return (
    <div className={`marquee marquee-wrap ${className}`}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
