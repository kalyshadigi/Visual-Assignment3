Plotly.d3.csv("shootings_by_hour.csv", function(err, rows) {

  const hours = Array.from({length: 23}, (_, i) => i.toString());
  const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const traces = rows.map(row => {
    const dayIndex = parseInt(row['DAY_OF_WEEK']);
      return {
        x: hours,
        y: hours.map(h => parseFloat(row[h])),
       mode: 'lines+markers',
       name: weekDay[dayIndex],
       type: 'scatter'
      };
  });

    const layout = {
      title: 'Shooting by Hour of the Day',
      xaxis: { title: 'Hour of Day', dtick: 1 },
      yaxis: { title: 'Number of Shootings' },
      hovermode: 'closest'
    };

    Plotly.newPlot('hourlyPlot', traces, layout);
});

Plotly.d3.csv("shootings_by_district.csv", function(err, rows) {
    if (err) return console.error(err);

    const districtNames = {
        'B2': 'Roxbury', 'B3': 'Mattapan', 'C11': 'Dorchester',
        'E13': 'Jamaica Plain', 'E18': 'Hyde Park'
    };

    const days = rows.map(row => row.DAY_OF_WEEK);

    // Only taking the top 5 districts
    const districts = ['B2', 'B3', 'C11', 'E13', 'E18'];

    // Uses full names to be easier to read
    const traces = districts.map((d) => ({ 
        x: days, 
        y: rows.map(row => parseFloat(row[d])), 
        name: districtNames[d] || d, 
        mode: 'lines+markers',
        type: 'scatter'
    }));

    Plotly.newPlot('districtPlot', traces, {
        title: 'Weekly Shootings by District Name',
        xaxis: { 
            title: 'Day of Week (0=Mon, 6=Sun)',
            dtick: 1 
        },
        yaxis: { title: 'Shootings' },
        hovermode: 'closest'
    });
});
