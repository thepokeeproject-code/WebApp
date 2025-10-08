<script>
    const values = $state({
        openId: null,
        elWindow: null,
    });

    const onToggle = (e) => {
        const id = e.currentTarget.id;
        values.openId = values.openId === id ? null : id;
    };

    $effect(() => {
        values.elWindow.document.querySelectorAll('.faq-icon').forEach((icon) => {
            const id = icon.parentElement.id;

            icon.textContent = values.openId !== id ? '+' : '–';
        });
    });
</script>

<svelte:window bind:this={values.elWindow} />

<section id="faq" data-aos="fade-up" class="scroll-mt-24 py-20 px-4 bg-gray-50">
    <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-8">Häufige Fragen</h2>
        <dl class="space-y-4">
            <div class="border border-gray-200 rounded-lg">
                <dt>
                    <button
                        id="timeline"
                        onclick={onToggle}
                        type="button"
                        class="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                    >
                        Wann ist gendly endlich online?
                        <span class="faq-icon">+</span>
                    </button>
                </dt>
                <dd class="faq-content px-4 pb-4 text-gray-700" class:hidden={values.openId !== 'timeline'}>
                    Leider ist gendly aktuell nur phasenweise aus Testgründen online und wir haben regelmäßig Downtimes.
                    Wir hoffen auf einen permanenten Betrieb noch im Jahr 2025.
                </dd>
            </div>

            <div class="border border-gray-200 rounded-lg">
                <dt>
                    <button
                        id="cost"
                        onclick={onToggle}
                        type="button"
                        class="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                    >
                        Was kostet gendly?
                        <span class="faq-icon">+</span>
                    </button>
                </dt>
                <dd class="faq-content px-4 pb-4 text-gray-700" class:hidden={values.openId !== 'cost'}>
                    Du kannst gendly kostenlos nutzen. In Zukunft wird es vielleicht eine kostenpflichtige pro oder
                    business Version geben, welche über zusätzliche Features verfügt.
                </dd>
            </div>

            <div class="border border-gray-200 rounded-lg">
                <dt>
                    <button
                        id="moderation"
                        onclick={onToggle}
                        type="button"
                        class="faq-toggle w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                    >
                        Wie wird der Inhalt moderiert?
                        <span class="faq-icon">+</span>
                    </button>
                </dt>
                <dd class="faq-content hidden px-4 pb-4 text-gray-700" class:hidden={values.openId !== 'moderation'}>
                    Aktuell müssen wir sämtlichen Content manuell moderieren, also benehmt euch! Wir arbeiten aber
                    bereits an einer automatisierten Lösung.
                </dd>
            </div>

            <div class="border border-gray-200 rounded-lg">
                <dt>
                    <button
                        id="genders"
                        onclick={onToggle}
                        type="button"
                        class="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                    >
                        Wann kommt non-binary/diverse Gender?
                        <span class="faq-icon">+</span>
                    </button>
                </dt>
                <dd class="faq-content px-4 pb-4 text-gray-700" class:hidden={values.openId !== 'genders'}>
                    Sicher eine der häufigsten Fragen. Aktuell konzentrieren wir uns auf Themen wie Moderation,
                    Monetarisierung und technische Stabilität, aber ein non-binary/diverse Gender ist uns auch wichtig,
                    daher wird es das auch in Zukunft geben. Wann genau können wir zu diesem Zeitpunkt leider nicht
                    sagen.
                </dd>
            </div>

            <div class="border border-gray-200 rounded-lg">
                <dt>
                    <button
                        id="privacy"
                        onclick={onToggle}
                        type="button"
                        class="w-full text-left px-4 py-3 font-medium flex justify-between items-center"
                    >
                        Wie sicher sind meine Daten?
                        <span class="faq-icon">+</span>
                    </button>
                </dt>
                <dd class="faq-content px-4 pb-4 text-gray-700" class:hidden={values.openId !== 'privacy'}>
                    So sicher, wie sie im Internet nur sein können. Wir speichern sämtliche Daten auf EU DSGVO-konformen
                    Servern und teilen sie nicht mit Dritten. Nähere Infos dazu findest du hier auf dieser Seite unter
                    "Datenschutz".
                </dd>
            </div>
        </dl>
    </div>
</section>
