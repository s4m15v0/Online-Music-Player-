function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"files/stairwaytoheaven.jpg",
		audio:"Stairway_To_Heaven.mp3",
		songname:"Stairway To Heaven",
		artistname:"Led Zeppelin"
	},
	{
		thumbnail:"files/likeastone.jpg",
		audio:"Like_A_Stone.mp3",
		songname:"Like A Stone",
		artistname:"Audioslave",
	},
	{
		thumbnail:"files/A_Sky_Full_of_Stars.jpg",
		audio:"A_Sky_Full_of_Stars.mp3",
		songname:"A Sky Full of Stars",
		artistname:"Coldplay",
	},
	{
		thumbnail:"files/layla.jpg",
		audio:"Layla.mp3",
		songname:"Layla",
		artistname:"Eric Clapton",
	},
	{
		thumbnail:"files/brothersinarms.jpg",
        audio:"Brothers_In_Arms.mp3",
		songname:"Brothers In Arms",
		artistname:"Dire Straits",
	},
	{
		thumbnail:"files/amorsho.jpg",
		audio:"Amorsho.mp3",
		songname:"Amorsho",
		artistname:"Owned",
	},
	{
		thumbnail:"files/Bhashomaan.jpg",
		audio:"Bhashomaan.mp3",
		songname:"Bhashomaan",
		artistname:"Poraho",
	},
	{
		thumbnail:"files/The_Mayan_Factor_Warflower.jpg",
		audio:"WThe_Mayan_Factor_Warflower.mp3",
		songname:"Warflower",
		artistname:"The Mayan Factor",
	},
	{
		thumbnail:"files/hotel_california.jpg",
		audio:"hotel_california.mp3",
		songname:"Hotel California",
		artistname:"Eagles",
	},
	{
		thumbnail:"files/blackfieldpain.jpg",
		audio:"blackfieldpain.mp3",
		songname:"Pain",
		artistname:"Blackfield",
	}
];

let currentSongIndex = 0;

let player = _(".player"),
	toggleSongList = _(".player .toggle-list");

let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="./files/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}

function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src","./files/"+song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("./files/${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";	
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","./files/"+song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);