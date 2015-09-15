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
			if(err) console.log(data);
			it++;
		}
	)
}

// Initial shuffle
shuffleTweets(tweets.text);

// Phreak doesn't like cron jobs
tweetStuff();
setInterval(tweetStuff, 1000 * 60 * 60 * 3);
