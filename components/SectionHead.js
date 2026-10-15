// Every section opens the same way: a heading and, at most, one sentence.
export default function SectionHead({ title, lede, id }) {
  return (
    <>
      <h2 id={id} className="text-4xl font-semibold leading-tight tracking-[-1.2px] md:text-5xl">{title}</h2>
      {lede && <p className="mt-4 max-w-[40em] text-lg text-muted">{lede}</p>}
    </>
  );
}
