// define the common parts of the API url as a variable so we don't need to rewrite it every time
const baseUrl = 'https://fortnite-public-api.theapinetwork.com/prod09/users';

const inputField = document.getElementById("epic-username");
const submitBtn = document.getElementById("user-submit");

let username = "";

const getUserStats = (event) => {
    // to prevent the regular form submit behavior
    event.preventDefault();
    username = inputField.value;
  
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let url = `${baseUrl}/id?username=${username}` ;
    console.log(proxyUrl + url);
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            const userId = data.uid;
            let newUrl = `${baseUrl}/public/br_stats_v2?user_id=${userId}`;
      
            return fetch(newUrl);
        })
        .then((resp) => resp.json()).then((data) => {
            console.log(data.overallData.defaultModes);
            document.getElementById("total-kills").innerHTML = data.overallData.defaultModes.kills;
            document.getElementById("matches-played").innerHTML = data.overallData.defaultModes.matchesplayed;
            document.getElementById("placed-top").innerHTML = data.overallData.defaultModes.placetop1;
            document.getElementById("players-outlived").innerHTML = data.overallData.defaultModes.playersoutlived;
            document.getElementById("overall-score").innerHTML = data.overallData.defaultModes.score;
        }).catch(function(error) {
            console.log('request failed', error);
        });
  }



  
