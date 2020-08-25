export default function (reposObj) {
  const counts = {};
  const colors = {};
  const languageStarsCount = {};
  const repositorySize = [];
  const repos = [];

  // loop through the repositories array
  reposObj.forEach((el) => {
    if (el.language !== null) {
      counts[el.language] = counts[el.language] ? counts[el.language] + 1 : 1;
      languageStarsCount[el.language] = languageStarsCount[el.language] ? languageStarsCount[el.language] + el.stargazers_count : el.stargazers_count;
    }
    if (el.name) {
      repos.push(el.size);
    }
  });

  const maxSize = Math.max(...repos);
  const minSize = Math.min(...repos);
  // loop over the repos array
  reposObj.forEach((el) => {
    if (el.name) {
      repositorySize[repositorySize.length] = {
        x: (el.size * 20) / (maxSize - minSize),
        y: (el.size * 20) / (maxSize - minSize),
        r: (el.size * 20) / (maxSize - minSize),
      };
    }
  });

  // fetch languages from the local json file and invoke the function to render all charts
  const fetchLanguagesColors = async () => {
    await fetch("colors.json")
      .then((data) => data.json())
      .then((data) => {
        Object.keys(counts).map((language) => {
          Object.keys(data).forEach((key) => {
            if (key === language) {
              colors[key] = data[language].color;
            }
          });
        });
        renderAllCharts();
      });
  };

  // render all charts on the page
  const renderAllCharts = () => {
    renderBarGraph();
    renderScatterPlotGraph();
    renderPieChart();
  };

  // Scatter plot graph
  const renderScatterPlotGraph = () => {
    const scatter = document.getElementById("scatterChart").getContext("2d");
    const scatterChart = new Chart(scatter, {
      type: "bubble",
      data: {
        datasets: [
          {
            data: repositorySize,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Repository Sizes Comparison",
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: "linear",
              position: "bottom",
            },
          ],
        },
      },
    });
  };

  //Bar Graph
  const renderBarGraph = () => {
    const bar = document.getElementById("barChart").getContext("2d");
    const myChart = new Chart(bar, {
      type: "bar",
      data: {
        labels: Object.keys(languageStarsCount),
        datasets: [
          {
            data: Object.values(languageStarsCount),
            backgroundColor: Object.values(colors),
            borderColor: Object.values(colors),
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Top Languages by Stars",
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  };

  // Pie Chart
  const renderPieChart = () => {
    const pie = document.getElementById("pieChart").getContext("2d");
    const myChart = new Chart(pie, {
      type: "doughnut",
      data: {
        labels: Object.keys(counts),
        datasets: [
          {
            data: Object.values(counts),
            borderColor: Object.values(colors),
            backgroundColor: Object.values(colors),
          },
        ],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: "Popular Languages",
        },
        legend: {
          display: true,
          position: "right",
          align: "start",
          labels: {
            fontFamily: "Open Sans",
          },
        },
      },
    });
  };

  fetchLanguagesColors();
}
