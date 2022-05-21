let index = -1, quotes = [];

// On Load
const onLoad = () => {
    fetchQuotes();

    // Attatch event listeners
    document.getElementById("new-quote").addEventListener("click", getNextQuote);
    document.getElementById("twitter-button").addEventListener("click", tweetQuote);
}

// Show quotes
const showNewQuote = (quote) => {
    document.getElementById("quote-text").textContent = quote.text;
    document.getElementById("quote-author").textContent = quote.author;
}

// Get next quote
const getNextQuote = () => {
    index = Math.floor(Math.random() * quotes.length);
    showNewQuote(quotes[index]);   
}

// Fetch Quotes
async function fetchQuotes() {
    const url = "https://type.fit/api/quotes";

    try {
        showLoader();
        
        const response = await fetch(url);
        quotes = await response.json();

        hideLoader();
        getNextQuote();

    } catch(error) {
        hideLoader();

        index = -1;
        quotes = [];

        showNewQuote({
            text : "",
            author : "",
        });

        alert(error);
    }
}

// Tweet quote

const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quotes[index].text} - ${quotes[index].author}`;
    window.open(twitterURL, "_blank");
}

// Loading indicator

const showLoader = () => {
    document.getElementById("loader").hidden = false;
}

const hideLoader = () => {
    document.getElementById("loader").hidden = true;
}

// module.exports = {
//     showLoader : showLoader
// };