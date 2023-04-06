fetch("Egå Engsø.json")
    .then((r) => r.json())
    .then((points) => {

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    
                    const id = entry.target.id;
                    console.log(id);

                    const [dates,counts] = points[id];
 
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
                        xaxis: {
                            tickformat: "%b\n%Y",
                        },
                    };
                    Plotly.newPlot(id, data, layout, { staticPlot: false });
                    intersectionObserver.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll(".plot").forEach((plot) => {
            intersectionObserver.observe(plot);
        });
    });
