// get user's data
// get user's coordinates
let userLat;
let userLong;

// get user's time


// helper functions
// check time of day returns user's hour of the day
const userTime = () => {
    let now = new Date();
    return now.getHours();
}

// checks time returns string stating what meal the user is most likely eating next
const getMealTime = () => {
    let timeHr = userTime();
    if (timeHr > 20){
        return "late nite snack"
    }
    else if (timeHr > 16){
        return "dinner"
    }
    else if (timeHr > 11){
        return "lunch"
    }
    else{
        return "breakfast"
    }
}



// build ads
// build ad 1
const buildAd1 = () => {
    let meal = getMealTime();
    let ad1 = document.querySelector(".ad1");
    let adText = document.createElement("p");
    adText.innerHTML = `We have the best <span>${meal}</span> in town!`
    ad1.append(adText);
}


// build ad 2
async function buildAd2(){
    navigator.geolocation.getCurrentPosition(getCoords, error);
    const href = `https://www.google.com/maps/search/coffee/@${userLat},${userLong},15z/`;
    let ad2 = document.querySelector(".ad2");
    let adText = document.createElement("p");
    adText.innerHTML = `It's time to try out coffee! 
    <span><a href = "${href}" target = "_blank"> We're this close!</a></span>`;
    ad2.append(adText);
}

async function getThoseCoods(){
    let coords = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    userLat = coords.coords.latitude;
    userLong = coords.coords.longitude;

}

function getCoords(position) {
    return position.coords
}

function error(error){
    console.log("no position information found")
}

// event listeners
// on load, build ads
window.onload = async () => {
    buildAd1();
    await getThoseCoods();
    buildAd2();
}
// Build Ad 2                                                             
