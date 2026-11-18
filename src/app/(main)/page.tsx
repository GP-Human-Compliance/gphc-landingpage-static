import { Container } from '@/components/Container'
import { Weave } from '@/components/Weave'

export default function Home() {
  return (
    <Container className="grid items-center gap-x-16 gap-y-14 py-12 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:py-28">
      <div>
        <h1 className="display text-balance text-6xl leading-[0.95] text-ink sm:text-7xl lg:text-8xl">
          Dem Menschen verpflichtet.
        </h1>
        <p className="mt-10 max-w-[32rem] text-pretty text-lg leading-8 text-muted sm:text-xl sm:leading-9">
          Unser Ziel ist, jeden Einzelnen und die Gesellschaft als Ganzes zur
          Selbstbestimmung zu ermutigen.
        </p>
        <p className="mt-4 text-lg font-semibold leading-8 text-ink sm:text-xl sm:leading-9">
          Dafür bauen wir Software.
        </p>
        <p className="mt-12 text-base text-muted">
          Schreiben Sie uns an{' '}
          <a href="mailto:info@gp-hc.de" className="link">
            info@gp-hc.de
          </a>
        </p>
      </div>
      <Weave className="mx-auto w-full max-w-[18rem] sm:max-w-[24rem] lg:max-w-[30rem]" />
    </Container>
  )
}
