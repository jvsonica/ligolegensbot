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
	T.post('statuses/update', 
		{ status: tweets.text[it] }, 
		function(err, data, response) {
			console.log("I just tweeted " + tweets.text[it]);
			if(err) console.log(data);
			it++;
		}
	)
}

// Initial shuffle
shuffleTweets(tweets.text);

// Create server due to Heroku booting time 60 sec restriction. It sucks
var http = require('http');
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.send('it is running\n');
}).listen(process.env.PORT || 5000);

console.log("Tweeting...")
// Phreak doesn't like cron jobs
setInterval(tweetStuff, 1000 * 60 * 60 * 3)