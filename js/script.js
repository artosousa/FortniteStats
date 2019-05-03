// define the common parts of the API url as a variable so we don't need to rewrite it every time
const baseUrl = 'https://fortnite-public-api.theapinetwork.com/prod09/users';

const inputField = document.getElementById("epic-username");
const submitBtn = document.getElementById("user-submit");
const form = document.getElementById("form");
const loaderHtml = document.getElementById('boxLoading');
const getUserStats = (event) => {
event.preventDefault();
const loader = '<div class="lds-dual-ring"></div><h1>LOADING YOUR STATS...</h1>';
loaderHtml.innerHTML = loader;
// to prevent the regular form submit behavior

const username = event.target.username.value;

const proxyUrl = "https://cors-anywhere.herokuapp.com/";
let url = `${baseUrl}/id?username=${username}` ;
fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        const userId = data.uid;
        let newUrl = `${baseUrl}/public/br_stats_v2?user_id=${userId}`;
     
        loaderHtml.innerHTML = " ";
        
        return fetch(newUrl);
        
    })
    .then((resp) => resp.json()).then((data) => {
        const totalKills = data.overallData.defaultModes.kills;
        const matchesPlayed = data.overallData.defaultModes.matchesplayed;
        const matchesWon = data.overallData.defaultModes.placetop1;
        const playersOutlived = data.overallData.defaultModes.playersoutlived; 
        const score = data.overallData.defaultModes.score;
        
        document.getElementById("total-kills").innerHTML = typeof totalKills === 'undefined' ? 'You have 0 kills' : `${totalKills} players killed in battle!`;
        document.getElementById("matches-played").innerHTML = typeof matchesPlayed === 'undefined' ? 'You have played 0 matches' : `You've gone to battle ${matchesPlayed} times!`;
        document.getElementById("placed-top").innerHTML = typeof matchesWon === 'undefined' ? 'You have won 0 matches' : `The champ is here! You've come out on top ${matchesWon} times!`;
        document.getElementById("players-outlived").innerHTML = typeof playersOutlived === 'undefined' ? 'You have outplayed 0 players' : `${playersOutlived} other players have died before you!`;
        document.getElementById("overall-score").innerHTML = typeof score === 'undefined' ? 'Big fat 0' : `Your overall score is ${score}!`;
    }).catch(function(error) {
        console.log('request failed', error);
    });
}


form.addEventListener('submit', getUserStats);
  
