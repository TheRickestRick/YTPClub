(function() {
  'use strict';

  let movies = [];

  const renderMovies = function(){
    for(let x of movies){
      let player = document.createElement("div");
      let thumb = document.createElement('img');
      let title = document.createElement('h3');
      let desc = document.createElement('p');
      desc.innerText = `${x.snippet.description}`;
      title.innerText = `${x.snippet.title}`;
      player.setAttribute("style", "padding:10px; margin:10px; display:inline-grid ; height:350px; width: 320px");
      thumb.src = `${x.snippet.thumbnails.medium.url}`;
      main.appendChild(player);
      player.appendChild(thumb);
      player.appendChild(title);
      player.appendChild(desc);

      let clear = "";
      let content = main.innerHTML;



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
        let identity = x.id.videoId;
        let rating = document.createElement('div');
        let video = document.createElement('iframe');
        let ratingForm = `
        <form>
          <fieldset>
            <span id="star-cb-group">
              <input type="radio" id="rating-0" name="rating" value="0" /><label for="rating-0">0</label>
              <input type="radio" id="rating-1" name="rating" value="1" checked="checked" /><label for="rating-1">1</label>
              <input type="radio" id="rating-2" name="rating" value="2" /><label for="rating-2">2</label>
              <input type="radio" id="rating-3" name="rating" value="3" /><label for="rating-3">3</label>
              <input type="radio" id="rating-4" name="rating" value="4" /><label for="rating-4">4</label>
              <input type="radio" id="rating-5" name="rating" value="5" class="star-cb-clear" /><label for="rating-5">5</label>
            </span>
          </fieldset>
        </form>
        `
        
        window.location.hash = "video";
        main.innerHTML = clear;
        rating.innerHTML = ratingForm;
        videoContainer.appendChild(video);
        videoContainer.appendChild(rating);
        video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
        video.src = `https://www.youtube.com/embed/${x.id.videoId}?controls=2`;
        main.appendChild(videoContainer);

        window.onpopstate = function(){
          loadPage()
        }
      })


    }

  }


  let youtubekey = localStorage.getItem('youtubekey');
  let main = document.getElementById('main');
  let menuItems = document.getElementsByClassName("dropdown-content")[0];
  let home = document.getElementById('home');
  let searchButton = document.getElementById("searchButton");
  let search = document.getElementById("search");

  let states = {
      "#home": function(){
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=YTP&type=video`)
        .then((data)=>{
          return data.json()
        })
        .then((data)=>{
          window.location.hash = window.location.hash || "home-"
          main.innerHTML = "";
          movies = data.items;
          renderMovies();
        });
      },

      "#browse": function(){
        let history = window.location.hash.split('-')[1]
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=${history}`)
        .then((data)=>{
          return data.json()
        })
        .then((data)=>{
          window.location.hash = "browse-";
          main.innerHTML = "";
          movies = data.items;
          renderMovies();
        });
      },

      "#search": function(){
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=YTP${search.value}&type=video`)
        .then((data)=>{
          return data.json()
        })
        .then((data)=>{
          window.location.hash = "search-"
          main.innerHTML = "";
          search.value = "";
          movies = data.items;
          renderMovies();
        });
      }
  }

  menuItems.addEventListener('click', function(ev){
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=${ev.target.innerText}`)
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      window.location.hash = `browse-${ev.target.innerText}`;
      main.innerHTML = "";
      movies = data.items;
      renderMovies();
    });
  });

  home.addEventListener('click', function(){
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=YTP&type=video`)
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      window.location.hash = "home";
      main.innerHTML = "";
      movies = data.items;
      renderMovies();
    });
  });

  searchButton.addEventListener('click', function(){
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=24&q=YTP${search.value}&type=video`)
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      window.location.hash = "search-"
      main.innerHTML = "";
      search.value = "";
      movies = data.items;
      renderMovies();
    });
  });

  window.onload = loadPage;

  function loadPage(){
    window.onpopstate = ""
    window.location.hash = window.location.hash || "home-"
    console.log(window.location.hash);
    states[window.location.hash.split('-')[0]]() // home,browse,search
  }

})();
