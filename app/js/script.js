import displayUserInfo from "./profile.js";
import renderCharts from "./charts.js";
import displayRepositories from "./repositories.js";

const username = "erickarugu32";
const APIURL = "https://api.github.com/users";
var userObject = {};
var reposObject = {};
var sortBy = "name";
const reposLimit = 12;

const displayRequestsLimit = (data) => {
  const requestsMaximum = document.querySelector("#req_maximum");
  const requestsRemaining = document.querySelector("#req_remaining");

  for (var pair of data.headers.entries()) {
    if (pair[0] === "x-ratelimit-limit") {
      requestsMaximum.innerText = pair[1];
    }
    if (pair[0] === "x-ratelimit-remaining") {
      requestsRemaining.innerText = pair[1];
    }
  }
};

const fetchUserRepositories = async (url, username) => {
  await fetch(`${url}/${username}/repos`)
    .then((data) => {
      displayRequestsLimit(data);
      return data.json();
    })
    .then((repositoryObject) => {
      reposObject = repositoryObject;
      renderCharts(repositoryObject);
      displayRepositories(repositoryObject, sortBy, reposLimit);
    });
};

const fetchUserInfo = async (url, username) => {
  await fetch(`${url}/${username}`)
    .then((data) => {
      displayRequestsLimit(data);
      return data.json();
    })
    .then((responseObject) => {
      userObject = responseObject;
      displayUserInfo(responseObject);
    });
};

const hideLoader = () => {
  setTimeout(() => {
    const loader = document.querySelector(".box");
    document.body.style.overflowY = "scroll";
    loader.style.display = "none";
  }, 2000);
};

window.onload = (e) => {
  document.title = "GitoStats | Eric Karugu";
  const sortByButton = document.querySelector("#sort_by");
  const usernameInput = document.querySelector("#github_name");
  const searchButton = document.querySelector("#search__btn");

  searchButton.addEventListener("click", (e) => {
    console.log(usernameInput.value);
    if (usernameInput.value) {
      fetchUserInfo(APIURL, usernameInput.value);
    }
  });
  sortByButton.addEventListener("change", (e) => {
    displayRepositories(reposObject, e.target.value, reposLimit);
  });

  hideLoader();
  fetchUserInfo(APIURL, username);
  fetchUserRepositories(APIURL, username);
};
