if ('IntersectionObserver' in window) {



    async function init() {
        const url = 'species.json';

        const res = await fetch(url);
        data = await res.json();

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!data) {
                        return;
                    }
                    const div = entry.target;

                    //div.removeAttribute('height');
                    div.style.height = 'unset';

                    const id = div.id;
                    let [order, family, genus] = id.split(' ');
                    let species = data[order][family][genus];
                    //console.log(species);

                    for (const name in species) {
                        //console.log(name);
                        const record = species[name];
                        const canonicalName = record['la'];
                        const error = record['e'];
                        const width = record['w'];
                        const height = record['h'];
                        const e = record['en'];
                        const d = record['da'];
                        let imgFileName = 'error.png';
                        if (!error) {
                            imgFileName = `species/${canonicalName}.jpg`;
                        }
                        div.insertAdjacentHTML('beforeend', `
                    <figure>
                    <a href='http://www.google.com/search?q=${canonicalName}' target='_blank'>
                        <img src='${imgFileName}' width=${width} height=${height} loading='lazy'>
                    </a>
                    <figcaption>
                        <a href='https://en.wikipedia.org/wiki/${canonicalName}' target='_blank'>
                            <span class='la'>${canonicalName}</span>
                        </a>    
                        <br>
                        <span class='en'>${e}</span><br>
                        <span class='da'>${d}</span>
                    </figcaption>
                    </figure>
                    `);
                    }



                    imageObserver.unobserve(div);
                }
            });
        },
            {
                rootMargin: "100% 0px 100% 0px"
            }
        );

        const divs = Array.from(document.querySelectorAll('.genus'));
        divs.forEach(div => imageObserver.observe(div));
    }
    init();
}

async function filter_figures() {
    const results = document.getElementById('results');
    results.innerHTML = '';
    const input = document.getElementById('filter').value;
    console.log(input);
    if (input == '') {
        return;
    }
    const re = new RegExp(input, 'i');

    for (const order in data) {
        for (const family in data[order]) {
            for (const genus in data[order][family]) {
                for (const species in data[order][family][genus]) {
                    const record = data[order][family][genus][species];
                    for (const lang of ['la', 'en', 'da']) {
                        let str = record[lang];
                        if (!str) {
                            str = '';
                        }
                        //console.log(str);
                        if (str.match(re)) {

                            const canonicalName = record['la'];
                            const error = record['e'];
                            const width = record['w'];
                            const height = record['h'];
                            const e = record['en'];
                            const d = record['da'];
                            let imgFileName = 'error.png';
                            if (!error) {
                                imgFileName = `species/${canonicalName}.jpg`;
                            }
                            results.insertAdjacentHTML('beforeend', `
                        <figure>
                        <a href='http://www.google.com/search?q=${canonicalName}' target='_blank'>
                            <img src='${imgFileName}' width=${width} height=${height} loading='lazy'>
                        </a>
                        <figcaption>
                            <a href='https://en.wikipedia.org/wiki/${canonicalName}' target='_blank'>
                                <span class='la'>${canonicalName}</span>
                            </a>    
                            <br>
                            <span class='en'>${e}</span><br>
                            <span class='da'>${d}</span>
                        </figcaption>
                        </figure>
                        `);
                            break;
                        }
                    }
                }
            }
        }
    }

}