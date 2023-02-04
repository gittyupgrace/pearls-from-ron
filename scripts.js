const app = {};

app.init = () => {
    app.getQuote();
}

app.quoteUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

//QUOTES API 

//fetch from quotes api
app.getQuote = () => {
    const url = new URL(app.quoteUrl);
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(jsonResponse => {
        app.displayQuote(jsonResponse);
    })
}

//display quote data on the page
app.displayQuote = (quote) => {
    //convert jsonResponse to a string
    const quoteString = quote.toString();
    //get <p> where string will appear
    const quoteContainer = document.getElementById('displayQuote');
    //insert quoteString into quoteContainer
    quoteContainer.textContent = quoteString;
}

app.init();