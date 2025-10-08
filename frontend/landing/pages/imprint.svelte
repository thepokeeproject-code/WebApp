<script>
    import Footer from '#pages/welcome/footer';
    import NavContent from '#pages/welcome/nav.content';
    import Cookies from '#components/cookies';
    import { translate } from '#state/translate';
</script>

<svelte:head>
    <title>{translate('messages.imprint')} – gendly</title>
</svelte:head>

<div class="flex flex-col grow shrink bg-teal-50 text-gray-800 z-0">
    <nav class="w-full px-6 py-4 flex items-center fixed top-0 bg-teal-50 shadow z-50">
        <div class="flex items-center space-x-6">
            <div class="text-3xl italic font-bold select-none">gendly</div>
        </div>
        <NavContent />
    </nav>
    <div class="h-20"></div>
    <section class="scroll-mt-24 py-20 px-6 h-full">
        <div class="max-w-6xl mx-auto flex flex-col">
            <h2 class="text-3xl font-semibold mb-4">
                {translate('messages.imprint')}
            </h2>
            <p>Angaben gemäß § 5 E-Commerce-Gesetz (ECG) und § 25 Mediengesetz (MedienG)</p>
            <ul>
                <li>
                    <h3>Medieninhaber und Herausgeber</h3>
                    <p>
                        Stefan Wallner<br />
                        Haidengasse 5<br />
                        1230 Wien<br />
                        E-Mail: info@gendly.app
                    </p>
                </li>
                <li>
                    <h3>Unternehmensgegenstand</h3>
                    <p>
                        Betrieb einer Online-Plattform für unterhaltende und aktuelle Inhalte (Memes, News) mit
                        Community-Funktion sowie der Vertrieb von Merchandise-Artikeln über einen Onlineshop. Einnahmen
                        erfolgen unter anderem durch Werbeschaltungen, Marktforschungstätigkeiten und der Verkauf
                        anonymisierter Daten.
                    </p>
                </li>
                <li>
                    <h3>Grundlegende Richtung der Website (Blattlinie)</h3>
                    <p>
                        Diese Website bietet unterhaltende und meinungsfreie Inhalte in Form von Memes sowie Nachrichten
                        aus verschiedenen Quellen. Ziel ist die Information, Unterhaltung und Beteiligung der Community
                        durch Teilen, Kommentieren und Bewerten von Inhalten.
                    </p>
                </li>
                <li>
                    <h3>Verantwortlich für den Inhalt</h3>
                    <p>
                        Stefan Wallner<br />
                        Adresse und Kontakt wie oben
                    </p>
                </li>
                <li>
                    <h3>Hinweis</h3>
                    <p>
                        Derzeit ist kein Gewerbe angemeldet. Die Website befindet sich im Aufbau und dient der
                        Vorbereitung einer künftigen geschäftlichen Tätigkeit.
                    </p>
                </li>
                <li>
                    <h3>Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO</h3>
                    <p>
                        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                        https://ec.europa.eu/consumers/odr<br />
                        Unsere E-Mail-Adresse finden Sie oben.
                    </p>
                </li>
            </ul>
        </div>
    </section>
    <Footer />
    <Cookies />
</div>

<style>
    h3 {
        font-weight: bold;
        margin: 1rem 0 0 0;
    }
</style>
