const url =
	"http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";
const tweets = [];
const dupeSet = new Set();
let timer;
let searchString = "";

const tweetContainer = document.getElementById("tweet-container");
const userTweetTemplate = document.querySelector("[data-user-tweet]");
const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-bar");
const startBtn = document.getElementById("start-poll");
const stopBtn = document.getElementById("stop-poll");

// sets searchString according to user input
searchForm.addEventListener("submit", e => {
	e.preventDefault();
	searchString = searchBar.value.trim().toLowerCase();
	console.log(searchString);
});

// call displayTweets then begin 10sec polling interval
startBtn.addEventListener("click", () => {
	displayTweets();
	timer = setInterval(displayTweets, 10000);
	console.log("set interval");
});

// clear interval upon button click
stopBtn.addEventListener("click", () => {
	clearInterval(timer);
	console.log("cleared interval");
});

/**
 * Makes a GET request using axios and removes duplicates from the tweets
 * new tweets are appended to global tweets array
 */
async function getTweets() {
	try {
		const res = await axios.get(url);
		removedDuplicates = removeDuplicates(res.data.statuses);
		tweets.push(...removedDuplicates);
	} catch (error) {
		console.log(error);
	}
}

/**
 * Removes currently displayed tweets and updates the global array of tweets with new, non-duplicate tweets
 * filters global array of tweets by search strings and sorts the array chronologically
 * iterates over remaining tweets and displays them
 */
async function displayTweets() {
	removeTweets();
	await getTweets(); //
	let filteredTweets = textFilter(tweets);
	let sortedTweets = sortDate(filteredTweets);
	for (tweet of sortedTweets) {
		// clone the tweet template and modify attributes
		const newTweet = userTweetTemplate.content.cloneNode(true).children[0];
		let pfp = newTweet.querySelector(".tweet-pfp");
		pfp.src = tweet.user.profile_image_url;
		let authorName = newTweet.querySelector(".tweet-author-name");
		authorName.innerText = `${tweet.user.name} `;
		let tweetHandle = newTweet.querySelector(".tweet-handle");
		tweetHandle.innerText = `@${tweet.user.screen_name}`;
		let tweetDate = newTweet.querySelector(".tweet-date");
		tweetDate.innerText = ` ${cleanDate(tweet.created_at)}`;
		let tweetContent = newTweet.querySelector(".tweet-content");
		tweetContent.innerText = tweet.text;
		tweetContainer.appendChild(newTweet);
	}
}

/**
 * Iterates over an array of tweets, if dupeSet does not contain a matching id, add id into dupeSet
 * and add tweet to array to be returned
 * @param {Array} data
 * @returns {Array} Array of tweets containing the searchString
 */
function removeDuplicates(data) {
	let newData = [];
	console.log(data);
	for (let i = 0; i < data.length; i++) {
		if (!dupeSet.has(data[i].id)) {
			newData.push(data[i]);
			dupeSet.add(data[i].id);
		} else {
			console.log("duplicate, nuke time");
		}
	}
	console.log(newData);
	return newData;
}

/**
 * Iterates over an array of tweets and returns tweets containing the search string
 * @param {Array} tweets
 * @returns {Array} Array of tweets containing the searchString
 */
function textFilter(tweets) {
	let spliceList = [];
	for (let i = 0; i < tweets.length; i++)
		if (tweets[i].text.includes(searchString)) spliceList.push(tweets[i]);
	console.log(spliceList);
	return spliceList;
}

/**
 * @param {Array} tweets
 * @returns {Array} Array of tweets sorted in chronological order
 */
function sortDate(tweets) {
	tweets.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	sortedTweets = tweets;
	return sortedTweets;
}

/**
 * Clears all displayed tweets
 */
function removeTweets() {
	while (tweetContainer.firstChild)
		tweetContainer.removeChild(tweetContainer.firstChild);
}

/**
 * Returns a properly formatted date
 * @param {string} date
 * @returns {string}
 */
function cleanDate(date) {
	let new_date = moment(date).format("MMM Do YY");
	if (new_date[5] === "s") new_date = new_date.slice(0, 5);
	else if (new_date[6] === "t") new_date = new_date.slice(0, 6);
	return new_date;
}
