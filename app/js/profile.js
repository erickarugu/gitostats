export default function (userObject) {
  const displayUserGithubInfo = (userObject) => {
    const userGithubAvatar = document.querySelector("#user_avatar");
    const userFullname = document.querySelector("#user_fullname");
    const userUsername = document.querySelector("#user_username");
    const userWork = document.querySelector("#user_work");
    const userLocation = document.querySelector("#user_location");
    const userJoinDate = document.querySelector("#user_join-date");
    const userRepos = document.querySelector("#user_repos");
    const userFollowers = document.querySelector("#user_followers");
    const userFollowing = document.querySelector("#user_following");

    var joinedDate = new Date(userObject.created_at);

    // insert the user's info
    userGithubAvatar.src = userObject.avatar_url;
    userFullname.innerText = userObject.name;
    userUsername.innerText = `@${userObject.login}`;
    userWork.innerText = userObject.company;
    userLocation.innerText = userObject.location;
    userJoinDate.innerText = joinedDate.toDateString();
    userRepos.innerText = userObject.public_repos;
    userFollowers.innerText = userObject.followers;
    userFollowing.innerText = userObject.following;
  };
  displayUserGithubInfo(userObject);
  // fetchUserInfo(url, username);
}
