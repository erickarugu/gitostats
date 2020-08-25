import displayUserInfo from "./profile.js";
import renderCharts from "./charts.js";
import displayRepositories from "./repositories.js";

const APIURL = "https://api.github.com/users";
var userObject = {};
var reposObject = {};
var sortBy = "name";
const reposLimit = 12;

const displayRequestsLimit = (data) => {
  // grab the reqest maximum and minumum elements from the dom
  const requestsMaximum = document.querySelector("#req_maximum");
  const requestsRemaining = document.querySelector("#req_remaining");

  // grab the limits from the returned object headers by looping through the headers entries
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
      // update the requests limit
      displayRequestsLimit(data);
      return data.json();
    })
    .then((repositoryObject) => {
      // assign the returned object to the reposObject
      reposObject = repositoryObject;
      // display the charts
      renderCharts(repositoryObject);
      // display the repositories
      displayRepositories(repositoryObject, sortBy, reposLimit);
    })
    .catch((err) => console.log(err));
};

const fetchUserInfo = async (url, username) => {
  await fetch(`${url}/${username}`)
    .then((data) => {
      // update the remaining requests limit
      displayRequestsLimit(data);
      return data.json();
    })
    .then((responseObject) => {
      // assign the returned object to the userObject
      userObject = responseObject;
      // display the user information on the page
      displayUserInfo(responseObject);
      // display the repository information on the page
      fetchUserRepositories(url, username);
    })
    .then((data) => {
      // grab the input box and the overlay
      const inputBox = document.querySelector("#main_entry");
      const overlay = document.querySelector("#overlay");

      // hide the input box
      inputBox.classList.add("closed");
      // remove the overlay
      overlay.style.display = "none";
    })
    .catch((err) => {
      // grab the input box and the search button
      const inputBox = document.querySelector("#main_entry");
      const searchButton = document.querySelector("#search__btn");

      searchButton.innerHTML = "Search";
      // show the input box again
      inputBox.classList.remove("closed");

      // notify user of the error
      window.alert("Unknown GitHub User!");

      // Change the page title
      document.title = `GitoStats | Unknown User`;
    });
};

const hideLoader = () => {
  setTimeout(() => {
    const loader = document.querySelector(".box");
    // enable scrolling on the Y axis
    document.body.style.overflowY = "scroll";
    loader.style.display = "none";
  }, 2000);
};

window.onload = (e) => {
  const sortByButton = document.querySelector("#sort_by");
  const usernameInput = document.querySelector("#github_name");
  const searchButton = document.querySelector("#search__btn");

  // add click evernt to the search button
  searchButton.addEventListener("click", (e) => {
    if (usernameInput.value) {
      fetchUserInfo(APIURL, usernameInput.value);
      e.target.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    }
  });

  // add keyup event to the username input
  usernameInput.addEventListener("keyup", (e) => {
    const inputValue = usernameInput.value;
    if (e.key === "Enter" && inputValue) {
      // fetch the user's info and display the information
      fetchUserInfo(APIURL, inputValue);
      // change the search button to spinner
      searchButton.innerHTML = `<i class="fa fa-spin fa-spinner"></i>`;
    }
  });

  // add change event to the sort button for the repos
  sortByButton.addEventListener("change", (e) => {
    displayRepositories(reposObject, e.target.value, reposLimit);
  });

  // hide the loader
  hideLoader();
};
