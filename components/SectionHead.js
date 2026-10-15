import { Ic } from './icons';

// Every section opens the same way: a heading and, at most, one sentence.
export default function SectionHead({ icon, title, lede, id }) {
  return (
    <>
      <h2 id={id} className="flex items-start gap-3 text-4xl font-semibold leading-tight tracking-[-1.2px] md:text-5xl">
        {icon && <Ic as={icon} className="mt-[0.14em]" />}
        {title}
      </h2>
      {lede && <p className="mt-4 text-lg text-muted">{lede}</p>}
    </>
  );
}
