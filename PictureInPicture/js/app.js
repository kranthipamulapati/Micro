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

// video

const video = document.getElementById("video");
const playButton = document.getElementById("playButton");

async function play() {

    try {
        
        const stream = await navigator.mediaDevices.getDisplayMedia();
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        }

    } catch (error) {
        alert(error);
    }

}

async function PIP() {
    await video.requestPictureInPicture();
}