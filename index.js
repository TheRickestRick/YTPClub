
var config = {
  apiKey: "AIzaSyBtoHk5PEG-pm8QTxisTRMuALv7lbFBnMI",
  authDomain: "ytpclub-196816.firebaseapp.com",
  databaseURL: "https://ytpclub-196816.firebaseio.com",
  projectId: "ytpclub-196816",
  storageBucket: "ytpclub-196816.appspot.com",
  messagingSenderId: "215843731019"
};
firebase.initializeApp(config);
let movies = [];
let youtubekey = localStorage.getItem('youtubekey');
let main = document.getElementById('main');
let menuItems = document.getElementsByClassName("dropdown-content")[0];
let home = document.getElementById('home');
let searchButton = document.getElementById("searchButton");
let search = document.getElementById("search");
let searchTerm;
let type;
let nextPageToken;
let previousPageToken;
let nextPageButton = document.getElementsByClassName("next")[0];
let previousPageButton = document.getElementsByClassName("previous")[0];
let saveVideo = document.getElementById("saveButton");
let favVideoID;
let favVideoTitle;
let favVideoDesc;
let favVideoThumb;
let favButton = document.getElementById("favorites");
let loginDiv = document.createElement('div');
let loginCred = `
<form>
<input class = "loginForm" id="txtEmail" type="text" placeholder="User Name">
<input class = "loginForm" id="txtPassword" type="text" placeholder="Password">
<input class = "loginForm" id="loginBtn" type="button" value="Login">
<input class = "loginForm" id="createAccount" type="button" value="Create Account">
<input class = "loginForm" id="logOut" type="button" value="Log out">
</form>
`
loginDiv.setAttribute("style", "padding:10%")

function renderData(movies){
  main.innerHTML = "";

  for(let movie of movies){
    let player = document.createElement("div");
    let thumb = document.createElement('img');
    let title = document.createElement('h3');
    let desc = document.createElement('p');
    desc.innerText = `${movie.snippet.description}`;
    title.innerText = `${movie.snippet.title}`;
    player.setAttribute("style", "padding:10px; margin:10px; display:inline-grid ; height:350px; width: 320px");
    thumb.src = `${movie.snippet.thumbnails.medium.url}`;
    main.appendChild(player);
    player.appendChild(thumb);
    player.appendChild(title);
    player.appendChild(desc);

    // window.location.hash = "#browse"

    thumb.addEventListener('mouseover', pick);
    thumb.addEventListener('mouseout', unpick);

    function pick(){
      thumb.setAttribute("style", "opacity:0.5");
    }

    function unpick(){
      thumb.setAttribute("style", "opacity:1");
    }

    thumb.addEventListener('click', function(){

      let videoContainer = document.createElement('div');
      let identity = movie.id.videoId;
      let videoActions = document.createElement('div');
      let video = document.createElement('iframe');
      favVideoDesc = movie.snippet.description;
      favVideoTitle = movie.snippet.title;
      favVideoID = movie.id.videoId;
      favVideoThumb = movie.snippet.thumbnails.medium.url;
      let saveButton = `
      <form>
      <input id="saveButton" type="button" value="Save Video">
      </form>
      `
      window.location.hash = "#video";
      main.innerHTML = "";
      videoActions.innerHTML = saveButton;
      videoContainer.appendChild(video);
      videoContainer.appendChild(videoActions);
      video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
      video.src = `https://www.youtube.com/embed/${movie.id.videoId}?controls=2`;
      main.appendChild(videoContainer);


    });
  }
}

function fetchData(){
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=YTP ${searchTerm}&type=${type}`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    nextPageToken = data.nextPageToken;
    movies = data.items;
    renderData(movies);
  });
}

function fetchNextData(){
  fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${nextPageToken}&key=${youtubekey}&part=snippet&maxResults=24&q=YTP ${searchTerm}&type=${type}`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    previousPageToken = data.prevPageToken;
    nextPageToken = data.nextPageToken;
    movies = data.items;
    console.log(data);
    renderData(movies);
  });
}

function fetchPreviousData(){
  fetch(`https://www.googleapis.com/youtube/v3/search?pageToken=${previousPageToken}&key=${youtubekey}&part=snippet&maxResults=24&q=YTP ${searchTerm}&type=${type}`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    previousPageToken = data.prevPageToken;
    movies = data.items;
    console.log(data);
    renderData(movies);
  });
}

menuItems.addEventListener("click", function(ev){
    window.location.hash = "#browse";
    main.innerHTML = "";
    searchTerm = ev.target.innerText;
    type = "";
    fetchData();
  })

searchButton.addEventListener("click", function(){
  main.innerHTML = ""
  searchTerm = search.value;
  type = "video";
  fetchData();
})

home.addEventListener("click", function(){
  window.location.hash = "#home";
  main.innerHTML = "";
  searchTerm = "";
  type = "video";
  fetchData();
})

nextPageButton.addEventListener("click", function(){
  console.log("yes")
  window.location.hash = "#browse";
  // main.innerHTML = "";
  fetchNextData();
})

previousPageButton.addEventListener("click", function(){
  console.log("The back button worked!")
  window.location.hash = "#browse";
  fetchPreviousData();
})

main.addEventListener("click", function(ev){
    if(ev.target.value === "Save Video"){
      var database = firebase.database();
      var ref = database.ref("favVideos");
      var favVideo ={
        thumb: favVideoThumb,
        title: favVideoTitle,
        description: favVideoDesc,
        videoId: `https://www.youtube.com/embed/${favVideoID}?controls=2`,
      };
      console.log(favVideoTitle);
      console.log(favVideoDesc);
      console.log(`https://www.youtube.com/embed/${favVideoID}?controls=2`);
      ref.push(favVideo);
    }
});

login.addEventListener("click", function(){
  console.log("Hi")
  main.innerHTML = "";
  main.appendChild(loginDiv);
  loginDiv.innerHTML = loginCred;

})

main.addEventListener("click", function(ev){
  if(ev.target.value === "Login"){
    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const loginButton = document.getElementById("loginBtn");
    const createAccount = document.getElementById("createAccount");
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  }
});

main.addEventListener("click", function(ev){
if(ev.target.value === "Create Account"){
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const loginButton = document.getElementById("loginBtn");
  const createAccount = document.getElementById("createAccount");
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));

}

});

main.addEventListener("click", function(ev){
if(ev.target.value === "Log out"){
  firebase.auth().signOut();
}
});

favButton.addEventListener("click", function(){
var database = firebase.database();
var ref = database.ref("favVideos");
ref.on('value', data);

function data(data){
  let videos = data.val();
  let keys = Object.keys(videos);
  main.innerHTML = "";
  console.log(videos);
  console.log(keys);
  for(let x=0; x < keys.length; x++){
    var k = keys[x];
    let player = document.createElement("div");
    let thumb = document.createElement('img');
    let title = document.createElement('h3');
    let desc = document.createElement('p');
    desc.innerText = videos[k].description;
    title.innerText = videos[k].title;
    player.setAttribute("style", "padding:10px; margin:10px; display:inline-grid ; height:350px; width: 320px");
    thumb.src = videos[k].thumb;
    main.appendChild(player);
    player.appendChild(thumb);
    player.appendChild(title);
    player.appendChild(desc);

    window.location.hash = "#browse"

    thumb.addEventListener('mouseover', pick);
    thumb.addEventListener('mouseout', unpick);

    function pick(){
      thumb.setAttribute("style", "opacity:0.5");
    }

    function unpick(){
      thumb.setAttribute("style", "opacity:1");
    }

    thumb.addEventListener('click', function(){

      let videoContainer = document.createElement('div');
      let identity = videos[k].videoId;
      let videoActions = document.createElement('div');
      let video = document.createElement('iframe');


      window.location.hash = "#video";
      main.innerHTML = "";
      videoContainer.appendChild(video);
      video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
      video.src = videos[k].videoId;
      main.appendChild(videoContainer);


    });
  }
}
})

firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser){
  console.log(firebaseUser);
}else{
  console.log("Not logged in.");
}
})

window.onpopstate = function(){
renderData(movies);
}
