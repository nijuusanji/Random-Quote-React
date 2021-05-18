// const quote = ["The greatest glory in living lies not in never falling, but in rising every time we fall.","The way to get started is to quit talking and begin doing.","Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",""]
const projectName = 'random-quote-machine';
let quotesData;

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];
var currentQuote = '',
  currentAuthor = '';


function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes); 
      }
    }
  });
}


function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  const randomQuote = getRandomQuote();
  var color = Math.floor(Math.random() * colors.length);
  currentQuote = randomQuote.quote
  currentAuthor = randomQuote.author
  
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );
  
  $('.text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });
  
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
  console.log(colors[color])
  
}


$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});


