export default function (reposObject, sortBy, reposLimit) {
  // function to sort the repos and call the fetchLanguagesCols passing down the sorted repos object to it in the process
  const sortRepos = (reposArray, sortBy, reposLimit) => {
    let arr = [...reposArray];

    if (sortBy) {
      if (sortBy === "stars") {
        arr.sort((a, b) => {
          return a.stargazers_count < b.stargazers_count ? 1 : -1;
        });
      } else if (sortBy === "name") {
        arr.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        });
      } else if (sortBy === "forks") {
        arr.sort((a, b) => {
          return a.forks_count < b.forks_count ? 1 : -1;
        });
      } else if (sortBy === "size") {
        arr.sort((a, b) => {
          return a.size < b.size ? 1 : -1;
        });
      }
    }
    if (arr.length > 0 && reposLimit && arr.length > reposLimit) {
      arr.length = reposLimit;
    }
    if (arr.length > 0) fetchLanguagesColors(arr);
  };

  // function to fetch the languages from the local json file and pass the returned objecy to the display repos function
  const fetchLanguagesColors = async (arr) => {
    await fetch("colors.json")
      .then((data) => data.json())
      .then((data) => {
        displayRepos(arr, data);
      });
  };

  // function to display the repos info on the page
  const displayRepos = (repos, colors) => {
    const reposContainer = document.querySelector("#repos-container");

    reposContainer.innerHTML = repos
      .map((repo) => {
        return `
            <div class="card flex flex-col jc-sa">
                <div class="card__header">
                  <a href="${!!repo.html_url ? repo.html_url : ""}" title="${!!repo.name ? repo.name : ""}" target="_blank">
                    <h3 id="repository__name">${!!repo.name ? repo.name : ""}</h3>
                  </a>
                </div>
                <div class="card__content">
                  <p id="repository__description">${!!repo.language ? repo.description : ""}</p>
                </div>
                <div class="card__footer flex flex-row jc-sb al-c">
                  <div class="repository__language flex jc-sb al-c">

                    <div id="repository__language-color" style="margin-right: 0.5rem;border: 0.625rem solid ${!!repo.language ? colors[repo.language].color : "#fff"}"></div>
                    <h5><span id="repository__language-name"> ${!!repo.language ? repo.language : ""}</span><h5>
                  </div>
                  <div class="repository__branches"><h5><i class="fas fa-code-branch"></i> <span id="repository__branches">${repo.forks_count >= 0 ? repo.forks_count : ""}</span></h5></div>
                  <div class="repository__stars"><h5><i class="far fa-star"></i> <span id="repository__stars">${repo.stargazers_count >= 0 ? repo.stargazers_count : ""}</span></h5></div>
                  <div class="repository__size"><h5><span id="repository__size">${repo.size > 1024 ? (repo.size / 1024).toFixed(2) + " MB" : repo.size + " KB"}</span></h5></div>
                </div>
              </div>
              `;
      })
      .join("");
  };

  // invoke the function to sort the repos and later call the fetch languages function
  sortRepos(reposObject, sortBy, reposLimit);
}
