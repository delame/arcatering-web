const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const paths: Record<string, React.ReactNode> = {
  plus: <path d="M8 3v10M3 8h10" {...stroke} />,
  minus: <path d="M3 8h10" {...stroke} />,
  arrow: <><path d="M3 8h10M9 4l4 4-4 4" {...stroke} /></>,
  check: <path d="M3 8.5l3 3 7-7" {...stroke} />,
  close: <><path d="M3 3l10 10M13 3L3 13" {...stroke} /></>,
  cart: <><path d="M2 3h2l1.5 8h7L14 5H5" {...stroke} /><circle cx="6" cy="13.5" r="1" fill="currentColor"/><circle cx="11" cy="13.5" r="1" fill="currentColor"/></>,
};

export function Icon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}>
      {paths[name]}
    </svg>
  );
}
