export default function (userObject) {
  // the function to display the info in the dom
  const displayUserGithubInfo = (userObject) => {
    // grab the necessary elements from the dom
    const userGithubAvatar = document.querySelector("#user_avatar");
    const userFullname = document.querySelector("#user_fullname");
    const userUsername = document.querySelector("#user_username");
    const userWork = document.querySelector("#user_work");
    const userLocation = document.querySelector("#user_location");
    const userJoinDate = document.querySelector("#user_join-date");
    const userRepos = document.querySelector("#user_repos");
    const userFollowers = document.querySelector("#user_followers");
    const userFollowing = document.querySelector("#user_following");

    // convert the date to a more readable format
    var joinedDate = new Date(userObject.created_at);
    joinedDate = joinedDate.toLocaleDateString();

    // Change the page title
    document.title = `GitoStats | ${userObject.name}`;

    // insert the user's info in the dom
    if (userObject.avatar_url) {
      userGithubAvatar.src = userObject.avatar_url;
    }
    if (userObject.name) {
      userFullname.innerText = userObject.name;
    }
    if (userObject.login) {
      userUsername.innerText = `@${userObject.login}`;
    }

    if (userObject.company) {
      userWork.innerHTML = `<i class="fas fa-briefcase"></i> <span>${userObject.company}</span>`;
    } else {
      userWork.style.display = "none";
    }
    if (userObject.company) {
      userLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span>${userObject.location}</span>`;
    } else {
      userLocation.style.display = "none";
    }
    if (userObject.company) {
      userJoinDate.innerHTML = `<i class="fa fa-calendar-alt"></i> <span>${joinedDate}</span>`;
    } else {
      userJoinDate.style.display = "none";
    }
    userRepos.innerText = userObject.public_repos;
    userFollowers.innerText = userObject.followers;
    userFollowing.innerText = userObject.following;
  };

  // confirm the passed object has the necessary fields
  if (typeof userObject.name !== "undefined") {
    displayUserGithubInfo(userObject);
  } else {
    // grab the input box and the overlay
    const inputBox = document.querySelector("#main_entry");
    const overlay = document.querySelector("#overlay");

    // re-show the input box
    inputBox.classList.remove("closed");

    //alert the user about the error
    window.alert("Unknown GitHub User!");

    // add the overlay
    overlay.style.display = "block";
    // Change the page title
    document.title = `GitoStats | Unknown User`;
  }
}
