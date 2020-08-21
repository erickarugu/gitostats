export default function (url, username, displayRequestsLimit) {
  const userObject = {
    login: "erickarugu32",
    id: 26389470,
    node_id: "MDQ6VXNlcjI2Mzg5NDcw",
    avatar_url: "https://avatars3.githubusercontent.com/u/26389470?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/erickarugu32",
    html_url: "https://github.com/erickarugu32",
    followers_url: "https://api.github.com/users/erickarugu32/followers",
    following_url: "https://api.github.com/users/erickarugu32/following{/other_user}",
    gists_url: "https://api.github.com/users/erickarugu32/gists{/gist_id}",
    starred_url: "https://api.github.com/users/erickarugu32/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/erickarugu32/subscriptions",
    organizations_url: "https://api.github.com/users/erickarugu32/orgs",
    repos_url: "https://api.github.com/users/erickarugu32/repos",
    events_url: "https://api.github.com/users/erickarugu32/events{/privacy}",
    received_events_url: "https://api.github.com/users/erickarugu32/received_events",
    type: "User",
    site_admin: false,
    name: "Eric Karugu",
    company: "Freelance",
    blog: "https://erickarugu32.github.io",
    location: "Nairobi, Kenya",
    email: null,
    hireable: true,
    bio: "I am a passionate web developer based in Nairobi, Kenya.\r\n\r\nSkills: JavaScript, WordPress, Linux, Git, Angular, MongoDB, Node.js, UI/UX",
    twitter_username: "karugu_eric",
    public_repos: 34,
    public_gists: 0,
    followers: 6,
    following: 6,
    created_at: "2017-03-13T17:55:23Z",
    updated_at: "2020-08-18T07:52:04Z",
  };

  const fetchUserInfo = async (url, username) => {
    await fetch(`${url}/${username}`)
      .then((data) => {
        displayRequestsLimit(data);
        return data.json();
      })
      .then((data) => displayUserGithubInfo(data));
  };

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
