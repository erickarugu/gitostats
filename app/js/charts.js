var ctx = document.getElementById("barChart").getContext("2d");
var ctx1 = document.getElementById("pieChart").getContext("2d");

var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(242,0,137,1)", "rgba(45,0,247,1)", "rgba(75, 192, 192, 1)", "rgba(192, 0, 0, 1)", "rgba(75, 192, 192, 1)", "rgba(192, 0, 0, 1)"],
        borderColor: ["rgba(255, 99, 132, 0)", "rgba(54, 162, 235, 0)", "rgba(255, 206, 86, 0)", "rgba(75, 192, 192, 0)", "rgba(153, 102, 255, 0)", "rgba(255, 159, 64, 0)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
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
var scatter = document.getElementById("scatterChart").getContext("2d");
var scatterChart = new Chart(scatter, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 10,
            y: 5,
          },
        ],
      },
    ],
  },
  options: {
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

var labels = ["HTML", "JavaScript", "CSS", "TypeScript", "Ruby"];
var data = [70, 30, 12, 12, 12];
var backgroundColors = ["#" + (((1 << 24) * Math.random()) | 0).toString(16), "rgb(188,0,221)", "rgb(137,0,242)", "rgba(192, 0, 0, 1)", "rgba(75, 192, 192, 1)", "rgba(192, 0, 0, 1)"];

var pie = document.getElementById("pieChart").getContext("2d");
var myChart = new Chart(pie, {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [
      {
        data: data,
        borderColor: backgroundColors,
        backgroundColor: backgroundColors,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Popular Languages",
    },
  },
  legend: {
    display: true,
    position: "right",
    labels: {
      fontColor: "rgb(255, 99, 132)",
    },
  },
});

export default function (userObject) {
  console.log(userObject);
}
