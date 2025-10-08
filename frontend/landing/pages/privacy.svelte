<script>
    import Footer from '#pages/welcome/footer';
    import NavContent from '#pages/welcome/nav.content';
    import Cookies from '#components/cookies';
    import { translate } from '#state/translate';
</script>

<svelte:head>
    <title>{translate('messages.privacy')} – gendly</title>
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
                {translate('messages.privacy')}
            </h2>
            <p>(Stand: Juli 2025 – DSGVO- und TKG-konform, für Österreich)</p>
            <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher
                ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003). In dieser
                Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen
                unserer Website.
            </p>
            <ol>
                <li>
                    <h3>Kontakt mit uns</h3>
                    <p>
                        Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre
                        angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen 6 Monate
                        bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                    </p>
                </li>
                <li>
                    <h3>Besondere Kategorien personenbezogener Daten</h3>
                    <p>
                        Im Rahmen freiwilliger Nutzerangaben (z. B. bei der Registrierung, in Umfragen oder zur
                        Profilerstellung) kann es zur Erhebung besonderer Kategorien personenbezogener Daten im Sinne
                        von Art. 9 DSGVO kommen, etwa zu Geschlecht, Alter, ethnischer Zugehörigkeit usw. Diese Daten
                        werden ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung verarbeitet (Art. 9 Abs. 2
                        lit. a DSGVO). Die Einwilligung kann jederzeit widerrufen werden. Die Verarbeitung erfolgt
                        ausschließlich zur anonymisierten Auswertung, Zielgruppenanalyse und Verbesserung unseres
                        Angebots. Eine Weitergabe an Dritte erfolgt nicht. Die Daten werden sicher gespeichert und
                        gelöscht, sobald sie für die genannten Zwecke nicht mehr erforderlich sind oder wenn die
                        Löschung von Ihnen beantragt wird.
                    </p>
                </li>
                <li>
                    <h3>Kommentare und Nutzerinteraktion</h3>
                    <p>
                        Wenn Sie Kommentare auf der Website hinterlassen, speichern wir die eingegebenen Daten sowie
                        Ihre IP-Adresse zur Spamprävention. Bei registrierten Nutzerkonten speichern wir die angegebenen
                        Informationen zur Nutzerverwaltung und Funktion der Plattform.
                    </p>
                </li>
                <li>
                    <h3>Newsletter und Benachrichtigungen</h3>
                    <p>
                        Sie haben die Möglichkeit, über unsere Website einen Newsletter oder Benachrichtigungen zu
                        Aktivitäten wie Posts, Kommentare usw. zu abonnieren. Hierfür benötigen wir Ihre E-Mail-Adresse
                        und Ihre Erklärung, dass Sie mit dem Bezug des Newsletters einverstanden sind (Double-Opt-In).
                        Den Newsletter können Sie jederzeit stornieren. Wir löschen anschließend umgehend Ihre Daten im
                        Zusammenhang mit dem Newsletter-Versand.
                    </p>
                </li>
                <li>
                    <h3>Online-Shop / Bestellungen</h3>
                    <p>
                        Wenn Sie über unseren Onlineshop Produkte bestellen, werden alle zur Vertragsabwicklung
                        notwendigen Daten gespeichert (z. B. Name, Adresse, E-Mail, Bestelldetails). Zahlungsdaten
                        werden je nach Zahlungsanbieter (z. B. Stripe, PayPal) direkt dort verarbeitet.
                    </p>
                </li>
                <li>
                    <h3>Cookies</h3>
                    <p>
                        Unsere Website verwendet Cookies, um die Benutzererfahrung zu verbessern und Funktionen wie
                        Login, Warenkorb und Werbeanzeigen zu ermöglichen. Beim ersten Besuch werden Sie über ein
                        Cookie-Banner um Ihre Einwilligung gebeten. Sie können Ihre Cookie-Einstellungen jederzeit
                        ändern oder widerrufen.
                    </p>
                </li>
                <li>
                    <h3>Webanalyse & Tracking</h3>
                    <p>
                        Diese Website verwendet Dienste zur Webanalyse wie z. B. Google Analytics, Facebook Pixel oder
                        Matomo, um das Nutzerverhalten zu analysieren und das Angebot zu verbessern. Dabei können
                        Cookies gesetzt und Daten (u. a. IP-Adresse, Browserinformationen) an Drittanbieter übermittelt
                        werden. Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung gemäß Art. 6
                        Abs. 1 lit. a DSGVO.
                    </p>
                </li>
                <li>
                    <h3>Werbung & Affiliate-Links</h3>
                    <p>
                        Wir zeigen auf dieser Website personalisierte und nicht-personalisierte Werbung über
                        Drittanbieter (z. B. Google AdSense, Amazon PartnerNet). Beim Klicken auf Anzeigen oder
                        Affiliate-Links kann es zur Datenverarbeitung durch Dritte kommen. Grundlage ist Ihre
                        Einwilligung.
                    </p>
                </li>
                <li>
                    <h3>Einbindung von Diensten Dritter (YouTube, Instagram etc.)</h3>
                    <p>
                        Diese Website bindet Inhalte externer Anbieter ein (z. B. Videos von YouTube, Beiträge von
                        Instagram). Diese Drittanbieter können Cookies setzen und Informationen über Ihr Nutzerverhalten
                        auf unserer Seite sammeln.
                    </p>
                </li>
                <li>
                    <h3>Ihre Rechte</h3>
                    <p>
                        Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung,
                        Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer
                        Daten gegen das Datenschutzrecht verstößt, können Sie sich bei uns oder bei der
                        Datenschutzbehörde beschweren.
                    </p>
                </li>
                <li>
                    <h3>Verantwortlicher für die Datenverarbeitung</h3>
                    <p>
                        Stefan Wallner<br />
                        Haidengasse 5<br />
                        1230 Wien<br />
                        E-Mail: info@gendly.app
                    </p>
                </li>
                <li>
                    <h3>Datenschutzbehörde Österreich</h3>
                    <p>
                        Österreichische Datenschutzbehörde<br />
                        Barichgasse 40–42<br />
                        1030 Wien<br />
                        https://www.dsb.gv.at
                    </p>
                </li>
            </ol>
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
