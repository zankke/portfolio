// Numbers that carry a claim: value large, what it counts underneath. Used by the hero and the service panel.
export default function Figures({ items, className = '', size = 'text-[28px] lg:text-[32px]' }) {
  if (!items?.length) return null;
  return (
    <dl className={`grid gap-x-6 gap-y-5 border-t border-ink pt-4 ${className}`}>
      {items.map(([value, label]) => (
        <div key={label} className="flex flex-col-reverse justify-end">
          <dt className="mt-1 text-sm leading-snug text-muted">{label}</dt>
          <dd className={`${size} leading-none font-display tracking-[-0.03em] tabular-nums whitespace-nowrap`}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
