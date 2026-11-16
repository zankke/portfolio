// Every section opens as a station on the line: a stop, the title, and a rule that runs to the edge. `icon` is accepted and ignored.
export default function SectionHead({ title, lede, id, dark }) {
  return (
    <>
      <div className="sec-head flex items-center gap-4">
        <span aria-hidden="true" className={`stop ${dark ? 'border-off bg-primary-strong' : ''}`} />
        <h2 id={id} className="text-h2">{title}</h2>
        <span aria-hidden="true" className={`rule ${dark ? 'bg-off/30' : ''}`} />
      </div>
      {lede && <p className={`mt-4 text-body ${dark ? 'text-off/80' : 'text-muted'}`}>{lede}</p>}
    </>
  );
}
