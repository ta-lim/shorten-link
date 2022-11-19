const longLink = document.getElementById("long-link");
const shortLink = document.getElementById("short-link");
const btnSubmit = document.getElementById("submit-btn");
const btnRandom = document.getElementById("random-btn")
const storageKey = "shorten-key";

let linkData = [];

if (localStorage.getItem(storageKey) !== null) {
  let linkData = JSON.parse(localStorage.getItem(storageKey));
}

// console.log(localStorage.getItem(storageKey));
function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putLink(objLink) {
  if (checkForStorage()) {
    linkData.push(objLink);
    localStorage.setItem(storageKey, JSON.stringify(linkData));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnCopy = document.getElementById("copyBtn")

  shortLink.addEventListener('click', () => {
    const shortUrl = shortLink.value
    // setInterval(() => {
    //   const warn = document.getElementById("warn")
    //   if(!shortUrl.match(/^[\w-]/g)){
    //     // [a-zA-Z0-9\-\_]
    //     console.log('err')
    //     warn.innerText = "test"
    //   }else{
    //     warn.innerText = ""
    //     console.log('ac')
    //   }
    // }, 1000)

  })

  btnSubmit.addEventListener("click", () => {
    const resultLink = document.getElementById("shortLink")
    if (longLink.value === "") return;
    if (shortLink.value === "") return;
    console.log(`https://link.otech.id/${shortLink.value}`, longLink.value);
    var objLink = {
      timestamp: new Date(),
      longUrl: longLink.value,
      shortUrl: shortLink.value
      //`link.otech.id/${}`
    };
    putLink(objLink);
    fetch("/api/url/shorten", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(objLink),
    })
      .then((r) =>
        r.json()
      )
      .then((response) =>{ 
          resultLink.innerText = response.shortUrl
          resultLink.setAttribute ("href",response.shortUrl )
          btnCopy.removeAttribute('hidden')
      })
    longLink.value = ""
    shortLink.value = ""
  });

  btnCopy.addEventListener('click' ,() => {
    console.log('klik')
    navigator.clipboard.writeText(document.getElementById('shortLink'));
    console.warn('shortlink copy to clipboard');
  })

  btnRandom.addEventListener('click', () => {
    fetch('/api/url/random', {
      method: "GET"
    })
    .then((r)=> 
      r.json()
    )
    .then((response) => {
      shortLink.value=response.random
    }
    )
  })
});