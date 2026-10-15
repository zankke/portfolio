import Head from 'next/head';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Figures from '../../components/Figures';
import { services, factsOf, Stack, Media, Shot, Links, Status } from '../../components/Projects';

export const getStaticPaths = () => ({ paths: services.map((s) => ({ params: { slug: s.slug } })), fallback: false });
export const getStaticProps = ({ params }) => ({ props: { slug: params.slug } });

const H2 = ({ id, children }) => <h2 id={id} className="text-[28px] font-semibold tracking-[-0.7px] md:text-[32px]">{children}</h2>;

export default function ServicePage({ slug }) {
  const i = services.findIndex((s) => s.slug === slug);
  const it = services[i];
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  const facts = factsOf(it.p);
  const overview = facts.find((f) => f.label === '개요')?.text ?? it.summary;
  // A pipeline fact written as "a → b → c" is a real sequence, so it gets numbered steps.
  const flow = facts.find((f) => f.text.includes('→'));
  const steps = flow ? flow.text.split('→').map((s) => s.trim()).filter(Boolean) : [];
  const decisions = facts.filter((f) => f.label && f.label !== '개요' && f !== flow);

  return (
    <>
      <Head>
        <title>{`${it.name} | 이상훈 Live Services`}</title>
        <meta name="description" content={it.summary} />
      </Head>
      <Navbar />
      <main className="wrap pt-6 pb-24">
        <Link href={`/#${it.id}`} className="inline-flex min-h-11 items-center gap-1 text-sm text-muted no-underline hover:text-ink">
          <ChevronLeft aria-hidden className="size-4" />Live Services
        </Link>

        <header className="mt-6 flex flex-wrap items-end justify-between gap-x-16 gap-y-8">
          <div className="min-w-0 flex-[1_1_560px]">
            <Status it={it} />
            <h1 className="mt-4 text-4xl leading-[1.05] font-display tracking-[-0.025em] sm:text-5xl lg:text-[64px]">{it.name}</h1>
            <p className="mt-5 max-w-[36em] text-lg text-ink/80 md:text-xl">{overview}</p>
          </div>
          <p className="flex flex-wrap gap-2"><Links it={it} /></p>
        </header>

        <Figures items={it.results} className="mt-12 grid-cols-2 border-t-2 sm:grid-cols-3" size="text-4xl lg:text-[56px]" />

        <Shot><Media p={it.p} plate={it.label} sizes="(max-width: 1240px) 100vw, 1200px" play /></Shot>

        {steps.length > 1 && (
          <section aria-labelledby="flow-h" className="mt-20 md:mt-24">
            <H2 id="flow-h">Pipeline</H2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
              {steps.map((s, n) => (
                <li key={s} className={`rounded-xl border p-5 ${n === steps.length - 1 ? 'border-ink bg-ink text-off' : 'border-line bg-off'}`}>
                  <span className={`block text-sm ${n === steps.length - 1 ? 'text-off/70' : 'text-muted'}`}>{n + 1}</span>
                  <span className="mt-2 block font-semibold">{s}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="mt-20 flex flex-wrap gap-16 md:mt-24">
          {decisions.length > 0 && (
            <section aria-labelledby="dec-h" className="min-w-0 flex-[999_1_520px]">
              <H2 id="dec-h">Decisions</H2>
              <dl className="mt-6 border-t border-line">
                {decisions.map((f) => (
                  <div key={f.label} className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[140px_minmax(0,1fr)]">
                    <dt className="font-semibold">{f.label}</dt>
                    <dd className="whitespace-pre-line text-ink/85">{f.text}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {it.p.tech && (
            <section aria-labelledby="stack-h" className="min-w-0 flex-[1_1_340px]">
              <H2 id="stack-h">Stack</H2>
              <Stack tech={it.p.tech} />
            </section>
          )}
        </div>

        <nav aria-label="다른 서비스" className="mt-20 grid gap-3 sm:grid-cols-2 md:mt-24">
          <Link href={`/services/${prev.slug}`} className="rounded-xl border border-line bg-off p-6 text-ink no-underline hover:border-ink/40">
            <span className="block text-sm text-muted">이전 서비스</span>
            <span className="mt-1 block text-xl font-semibold">{prev.name}</span>
          </Link>
          <Link href={`/services/${next.slug}`} className="rounded-xl border border-line bg-off p-6 text-ink no-underline hover:border-ink/40 sm:text-right">
            <span className="block text-sm text-muted">다음 서비스</span>
            <span className="mt-1 block text-xl font-semibold">{next.name}</span>
          </Link>
        </nav>
      </main>
    </>
  );
}
