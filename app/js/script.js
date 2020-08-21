import displayUserInfo from "./profile.js";
import renderCharts from "./charts.js";
import displayRepositories from "./repositories.js";

var username = "daniel";
const APIURL = "https://api.github.com/users";

const displayRequestsLimit = (data) => {
  const requestsMaximum = document.querySelector("#req_maximum");
  const requestsRemaining = document.querySelector("#req_remaining");

  for (var pair of data.headers.entries()) {
    console.log(pair[0] + ": " + pair[1]);
    if (pair[0] === "x-ratelimit-limit") {
      requestsMaximum.innerText = pair[1];
    }
    if (pair[0] === "x-ratelimit-remaining") {
      requestsRemaining.innerText = pair[1];
    }
  }
};

const hideLoader = (e) => {
  setTimeout(() => {
    const loader = document.querySelector(".box");
    document.body.style.overflowY = "scroll";
    loader.style.display = "none";
  }, 2000);
};

window.onload = (e) => {
  document.title = "GitoStats | Eric Karugu";
  displayUserInfo(APIURL, username, displayRequestsLimit);
  renderCharts(APIURL, username, displayRequestsLimit);
  displayRepositories(APIURL, username, displayRequestsLimit);
  hideLoader();
};
