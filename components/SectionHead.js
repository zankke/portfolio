import { Ic } from './icons';

// Every section opens the same way: a heading and, at most, one sentence.
export default function SectionHead({ icon, title, lede, id, dark }) {
  return (
    <>
      <h2 id={id} className="flex items-center gap-3 text-[30px] font-bold leading-tight tracking-[-0.9px] md:text-4xl">
        {icon && <Ic as={icon} />}
        {title}
      </h2>
      {lede && <p className={`mt-3 text-[17px] leading-relaxed ${dark ? 'text-off/75' : 'text-muted'}`}>{lede}</p>}
    </>
  );
}
