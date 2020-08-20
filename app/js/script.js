import renderCharts from "./charts.js";
import displayUserInfo from "./profile.js";

const APIURL = "https://api.github.com/users/";

const hideLoader = (e) => {
  setTimeout(() => {
    const loader = document.querySelector(".box");
    document.body.style.overflowY = "scroll";
    loader.style.display = "none";
  }, 2000);
};

window.onload = (e) => {
  displayUserInfo(APIURL, "erickarugu32");
  renderCharts(APIURL, "erickarugu32");
  hideLoader();
};
