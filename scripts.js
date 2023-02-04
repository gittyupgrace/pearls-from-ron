const app = {};

app.init = () => {
    app.getQuote();
    app.getGif();
}

app.quoteUrl = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';

app.giphyUrl = 'https://api.giphy.com/v1/gifs/search';
app.giphyKey = 'niFzIYdUFzBzGLuxTwDuqNHVcy1quDzv';

//QUOTES API 

//fetch data from quotes api
app.getQuote = () => {
    const url = new URL(app.quoteUrl);
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            app.displayQuote(jsonResponse);
        });
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

//GIPHY API

//fetch data from giphy api with specific search parameters
app.getGif = () => {
    const url = new URL(app.giphyUrl);

    //add search params to base url
    url.search =  new URLSearchParams({
        api_key: app.giphyKey, 
        q: 'ron swanson', 
        limit: 1, 
        offset: Math.floor(Math.random() * 50)
    });

    //fetch data
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            app.displayGif(jsonResponse.data);
        });
}

//display gif on the page
app.displayGif = (gifData) => {

    gifData.forEach(gif => {
        //capture img src url
        const gifSrc = gif.images.original_still.url;
        const gifAlt = gif.title;

        //get existing img element from page
        const image = document.getElementById('displayGif');
        //insert gif img/alt data into img element
        image.src = gifSrc;
        image.alt = gifAlt;
    })
}


app.init();