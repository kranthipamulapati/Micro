// Loader

const onLoad = () => {
    hideLoader();
}

const showLoader = () => {
    document.getElementById("loader").hidden = false;
}

const hideLoader = () => {
    document.getElementById("loader").hidden = true;
}

// text-to-speech

function textToSpeech(text) {

    let utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = speechSynthesis.getVoices()[0];    
    speechSynthesis.speak(utterThis);
}

// get Joke

async function getJoke() {
    let URL = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

    try {
        let response = await fetch(URL);
        response = await response.json()
        textToSpeech(response.joke);
    } catch(error) {
        alert(error);
    }
    
}