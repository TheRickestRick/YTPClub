


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

        window.location.hash = "#video";
        main.innerHTML = "";
        rating.innerHTML = ratingForm;
        videoContainer.appendChild(video);
        videoContainer.appendChild(rating);
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


    window.onpopstate = function(){
      renderData(movies);
    }
