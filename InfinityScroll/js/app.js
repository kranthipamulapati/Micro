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

// Images

let ready = false;
let totalImages = 0;
let loadedImages = 0;

const apiURL = "https://api.unsplash.com/photos/random/?client_id=YOUR_ACCESS_KEY&count=10";

// Get 10 Photos

async function getPhotos() {

    try {
        
        let response = await fetch(apiURL);
        response = await response.json();
        showPhotos(response);

    } catch (error) {
        alert(error);
    }

}

// Show Photos

function showPhotos(photos) {
    totalImages += photos.length;

    const imageContainer = document.getElementById("image-container");
    photos.forEach(photo => {

        let img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.addEventlistener("load", imageLoaded);
        imageContainer.appendChild(img);

    });
}

function imageLoaded() {
    loadedImages++;
    if(loadedImages === totalImages) ready = true;
}

window.addEventListener("scroll", function() {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        
        console.log("bottom!");
        ready = false;
        getPhotos();
    }
});

getPhotos();