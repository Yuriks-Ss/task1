const URL = "https://api.github.com/users/";
const forma = document.getElementById("MyForm");
const search = document.getElementById("search");

async function getUser(username) {
    const res = await fetch(URL + username)
    const resData = await res.json()
    creteUserCard(resData)
    getRepos(username)
}

async function getRepos(username) {
    const res = await fetch(URL + username + "/repos")
    const resData = await res.json()
    addReposToCard(resData)
}

function addReposToCard(repos) {
    const reposElm = document.getElementById("repos")
    repos.forEach((repo) => {
        const repoElm = document.createElement("a",)
        repoElm.href = repo.html_url
        repoElm.target = "_blank"
        repoElm.innerText = repo.name
        reposElm.appendChild(repoElm)
    })
    console.log(repos)
}

function creteUserCard(user) {
    main.innerHTML = `
      <div class="card" style="padding:5px">
          <div class="center">
              <img src="${user.avatar_url}" alt="${user.name}" width="50%" />
          </div>
          <div>
              <h2>${user.name}</h2>
              <ul>
                  <li><strong>Repos :</strong>${user.public_repos}</li> 
              </ul>
              <div id="repos"></div>
          </div>
      </div>
  `;
}

forma.addEventListener("submit", (e) => {
    e.preventDefault()
    const user = search.value

    if (user) {
        getUser(user)
        search.value = ""
    }
    (!user)
    search.value = ""
    main.innerHTML = `
        <h3>enter user in form </h3>
        `
})