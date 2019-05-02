const inputField = document.getElementById("epic-username");
const submitBtn = document.getElementById("user-submit");

let username = "";

const getUserStats = () => {
    username = inputField.value;
  
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let url = 'https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=' + username;
    console.log(proxyUrl + url);
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            const userId = data.uid;
            let newUrl = 'https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=' + userId;
      
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



  
