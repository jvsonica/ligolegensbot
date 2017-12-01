// Twit library is used to post our tweets
import Twit from 'twit';
import config from './config.js';
import { tweets } from './tweets.js';

// Shuffle array so that tweets aren't that predictable
const shuffleArray = (a) => {
	const arr = a.slice();
	for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;	
}
let possibleTweets = shuffleArray(tweets);

// This function tweets stuff from the array of tweets
let it = 0;
const tweetStuff = () => {
	if (it == possibleTweets.length) { 
		possibleTweets = shuffleArray(possibleTweets); 
		it = 0; 
	}
	console.log("Tweeting " + it + " - " + possibleTweets[it])
	it = it + 1;
	T.post('statuses/update', 
		{ status: possibleTweets[it] }, 
		(err) => {
			if(err) console.log(err);
			it++;
		}
	)
}

// Initializing our Twitter client with our configuration
const T = new Twit(config);

// Tweeting every 3 hours
tweetStuff();
setInterval(tweetStuff, 1000 * 5)


// Create server due to Heroku booting time 60 sec restriction and 15 min sleep trigger. It sucks
var http = require('http');
http.createServer((request, response) => {
	// Default response for any request
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("I'm still alive\n");
}).listen(process.env.PORT || 5000);

// Pinging oneself every 5 min so that machine doesn't enter sleep mode 
setInterval(() => {
    http.get("http://ligolegensbot.herokuapp.com");
}, 1000 * 60 * 5);
