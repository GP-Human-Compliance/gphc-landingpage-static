import { Container } from "@/components/Container";

export default function Legal() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container className="max-w-3xl">
        <div className="space-y-8">
          <section>
            <h1 className="text-4xl font-bold mb-4">Impressum</h1>
            <h2 className="font-semibold text-xl mb-4">Angaben gemäß § 5 TMG:</h2>
            <div className="space-y-2">
              <address className="not-italic pb-5">
                GP Human Compliance GmbH<br />
                Im Altenschemel 52<br />
                D-67435 Neustadt an der Weinstraße
              </address>
              <dl>
                <dt className="font-semibold">Geschäftsführer</dt>
                <dd className="pb-2">Alexander Hoffmann, Peter Schaub</dd>
                <dt className="font-semibold">Handelsregister Ludwigshafen</dt>
                <dd className="pb-2">HRB 68877</dd>
                <dt className="font-semibold">USt-ID</dt>
                <dd className="pb-2">DE360520973</dd>
                <dt className="font-semibold">Email</dt>
                <dd>info[at]gp-hc.de</dd>
              </dl>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-4">Haftung für Inhalte</h2>
            <div className="space-y-4">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-4">Haftung für Links</h2>
            <div className="space-y-4">
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-xl mb-4">Urheberrecht</h2>
            <div className="space-y-4">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
