const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')
//  Get Quotes from API
let apiQuotes = [];

// Show Loading
function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete () {
    loader.hidden = true;
    quoteContainer.hidden = false; 
}
// Display New Quote
function newQuote() {
    loading();
    // Pick a ramdom quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // Check if author field is blank and replace it with "Unknown"
    
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } 
    else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine the styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //  Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote();
    } catch (error) {
        // catch error
    }
}

// tweet quote
function tweetQuote() {
     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterUrl, '_blank')
}
//  Event Listener
newQuotebtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)
// On Load
getQuotes();
