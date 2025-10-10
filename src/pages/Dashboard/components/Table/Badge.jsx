export default function Badge({ value, color, className = "" }) {
  const colors = {
    yellow: "color-bg-accent text-black",
    blue: "bg-[rgba(67,133,232,1)] text-white",
    red: "bg-[rgba(255,37,103,1)] text-white",
    green: "bg-[rgba(22,219,101,1)] text-white",
    blocked: "bg-[rgba(173,173,173,1)] text-white",
  };

  return (
    <span
      className={`rounded-full text-sm font-bold flex items-center justify-center w-6 h-6 ${colors[color]} ${className}`}
    >
      {value}
    </span>
  );
}
