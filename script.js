fetch("Egå Engsø.json")
    .then((r) => r.json())
    .then((points) => {

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    
                    const id = entry.target.id;
                    console.log(id);

                    const [dates,counts] = points[id];

                    var selectorOptions = {
                        buttons: [ {
                            step: 'year',
                            stepmode: 'todate',
                            count: 1,
                            label: 'YTD'
                        }, {
                            step: 'year',
                            stepmode: 'backward',
                            count: 1,
                            label: '1y'

                        }, {
                            step: 'year',
                            stepmode: 'backward',
                            count: 2,
                            label: '2y'
                        }, {
                            step: 'year',
                            stepmode: 'backward',
                            count: 5,
                            label: '5y'
                        }, {                          
                            step: 'all',
                        }],
                    };                    
 
                    var data = [
                        {
                            x: dates,
                            y: counts,
                            type: "histogram",
                            histfunc: "max",
                            xbins: {
                                size: "M1",
                            },
                        },
                    ];
                    var layout = {
                        title: id,
                        yaxis: {
                            //fixedrange: true,
                            //rangemode: "nonnegative",

                        },
                        xaxis: {
                            tickformat: "%b\n%Y",
                            //range: ["2020-01-01", "2024-01-01"],
                            rangeselector: selectorOptions,

                            //rangeslider: {}                            
                           
                        },
                    };
                    Plotly.newPlot(id, data, layout, { staticPlot: false, responsive: true });
                    intersectionObserver.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll(".plot").forEach((plot) => {
            intersectionObserver.observe(plot);
        });
    });
