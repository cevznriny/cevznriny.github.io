async function filter_figures()  {
    const results  = document.getElementById('results');
    results.innerHTML = '';
    const input = document.getElementById('filter').value;
    console.log(input);
    if (input == '') {
        return;
    }
    const spans = document.querySelectorAll('.en, .da, .la');
    const re = new RegExp(input,'i');    
    spans.forEach(e => { 
        //console.log(e.innerText);
        if (e.innerText.match(re)) {
            const figure = e.parentNode.parentNode;
            const clone = figure.cloneNode(true);
            results.appendChild(clone);
        } else {

        }
        });
    }