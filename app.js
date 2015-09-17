// Twit library is used to post our tweets
var Twit = require('twit');

// Let's initialize it with our configuration
var T = new Twit(require('./config.js'));

// Load Tweets array
var tweets = require('./tweets.js');
var it=0;

// Top answer from StackOverflow. I'm that lazy
function shuffleTweets(o) {
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x); return o;
}

// This function tweets stuff from the array of tweets
function tweetStuff() {
	if(it == tweets.text.length){ shuffleTweets(tweets.text); it = 0; }
	console.log("Tweeting " + it + " - " + tweets.text[it])
	T.post('statuses/update', 
		{ status: tweets.text[it] }, 
		function(err, data, response) {
			if(err) console.log(err);
			else{
				//console.log("I just tweeted " + tweets.text[it]);
			}
			it++;
		}
	)
}

// Initial shuffle
shuffleTweets(tweets.text);

// Create server due to Heroku booting time 60 sec restriction and 15 min sleep trigger. It sucks
var http = require('http');
http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("I'm still alive\n");
}).listen(process.env.PORT || 5000);

console.log("Server is now up and running! I will start tweeting in a few moments.")

// Phreak doesn't like cron jobs
tweetStuff();
setInterval(tweetStuff, 1000 * 3)

// Pinging every 5 min
setInterval(function() {
    http.get("http://ligolegensbot.herokuapp.com");
}, 1000 * 60 * 5);