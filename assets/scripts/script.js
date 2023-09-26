'use strict'
const APIURL = 'https://api.github.com/users/'
const main = document.querySelector('#display')
const searchBox = document.querySelector('#search')
const getUser = async (username) => {
  const response = await fetch(APIURL + username)
  const data = await response.json()
  const card = `
    <div id="display">
      <div>
        <img class="avatar" src="${data.avatar_url}" alt="github-picture">
      </div>
      <div class="info-user">
        <h2><a>${data.name}</a></h2>
        <p>${data.bio}</p>
        <ul>
          <li>${data.followers} <strong>followers</strong></li>
          <li>${data.following} <strong>following</strong></li>
          <li>${data.public_repos}<strong>repos</strong></li>
        </ul>stuck
        <div id="repos">
          </div>
      </div>
    </div> `

  main.innerHTML = card
  getRepos(username)
}

getUser('abuemkezechu')

const getRepos = async (username) => {
  const repos = document.querySelector('#repos')
  const response = await fetch(APIURL + username + '/repos')
  const data = await response.json()
  data.forEach(
    (item) => {
      const element = document.createElement('a')
      element.classList.add('repo')
      element.href = item.html_url
      element.innerText = item.name
      element.target = '_blank'
      repos.appendchild(element)
    }
  )
}

const formSubmit = (e) => {
  if (searchBox.value !== '') {
    getUser(searchBox.value)
    searchBox.value = ''
  }
  return false
}

searchBox.addEventListener(
  'focusout',
  function () {
    formSubmit()
  }
)
