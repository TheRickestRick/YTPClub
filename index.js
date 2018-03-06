let youtubekey = localStorage.getItem('youtubekey');
let main = document.getElementById('main');
let menuItems = document.getElementsByClassName("dropdown-content")[0];
let home = document.getElementById('home');
let searchButton = document.getElementById("searchButton");
let search = document.getElementById("search");



menuItems.addEventListener('click', function(ev){
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=25&q=${ev.target.innerText}`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    main.innerHTML = "";
    let arr = data.items;
    for(let x of arr){
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

      thumb.addEventListener('mouseover', pick);
      thumb.addEventListener('mouseout', unpick);

      function pick(){
        thumb.setAttribute("style", "opacity:0.5");
      }

      function unpick(){
        thumb.setAttribute("style", "opacity:1");
      }

      thumb.addEventListener('click', function(){
        console.log(x.id.videoId);
        main.innerHTML = '';
        let video = document.createElement('iframe');
        video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
        video.src = `https://www.youtube.com/embed/${x.id.videoId}?controls=2`;
        main.appendChild(video);
      })
    }

  });
});


home.addEventListener('click', function(){
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=25&q=YTP&type=video`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    main.innerHTML = "";
    let arr = data.items;
    for(let x of arr){
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

      thumb.addEventListener('mouseover', pick);
      thumb.addEventListener('mouseout', unpick);

      function pick(){
        thumb.setAttribute("style", "opacity:0.5");
      }

      function unpick(){
        thumb.setAttribute("style", "opacity:1");
      }

      thumb.addEventListener('click', function(){
        console.log(x.id.videoId);
        main.innerHTML = '';
        let video = document.createElement('iframe');
        video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
        video.src = `https://www.youtube.com/embed/${x.id.videoId}?controls=2`;
        main.appendChild(video);
      })
    }

  });
});

searchButton.addEventListener('click', function(){
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=25&q=YTP${search.value}&type=video`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    main.innerHTML = "";
    search.value = "";
    let arr = data.items;
    for(let x of arr){
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

      thumb.addEventListener('mouseover', pick);
      thumb.addEventListener('mouseout', unpick);

      function pick(){
        thumb.setAttribute("style", "opacity:0.5");
      }

      function unpick(){
        thumb.setAttribute("style", "opacity:1");
      }

      thumb.addEventListener('click', function(){
        console.log(x.id.videoId);
        main.innerHTML = '';
        let video = document.createElement('iframe');
        video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
        video.src = `https://www.youtube.com/embed/${x.id.videoId}?controls=2`;
        main.appendChild(video);
      })
    }
  });
});


window.onload = function(){
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${youtubekey}&part=snippet&maxResults=25&q=YTP&type=video`)
  .then((data)=>{
    return data.json()
  })
  .then((data)=>{
    console.log(data);
    main.innerHTML = "";
    let arr = data.items;
    for(let x of arr){
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

      thumb.addEventListener('mouseover', pick);
      thumb.addEventListener('mouseout', unpick);

      function pick(){
        thumb.setAttribute("style", "opacity:0.5");
      }

      function unpick(){
        thumb.setAttribute("style", "opacity:1");
      }

      thumb.addEventListener('click', function(){
        let video = document.createElement('iframe');
        console.log(x.id.videoId);
        main.innerHTML = '';
        video.setAttribute("style", "padding:10px; margin-left:6%;margin-top:2%; height:600px; width:1200px")
        video.src = `https://www.youtube.com/embed/${x.id.videoId}?controls=2`;
        main.appendChild(video);
      })
    }
  });
};
