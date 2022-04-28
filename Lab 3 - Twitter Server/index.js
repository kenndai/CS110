const url =
	"http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";
const tweets = [];
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

// uses axios to fetch tweets
// pushes fetched tweets into global tweets array
async function getTweets() {
	try {
		const res = await axios.get(url);
		tweets.push(...res.data.statuses);
	} catch (error) {
		console.log(error);
	}
}

// should first remove all tweets, i.e refreshTweets()
// for all tweets that match that query, create a tweet and display
async function displayTweets() {
	refreshTweets();
	await getTweets();
	removeDuplicates(tweets);
	textFilter(tweets);
	sortDate(tweets);
	for (tweet of tweets) {
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

//not extensively tested, might have bugs
function removeDuplicates(tweets) {
	let tweetIds = [];
	let newData = [];
	for (let i = 0; i < tweets.length; i++) {
		tweetIds.push(tweets[i].id);
	}
	for (let i = 0; i < tweets.length; i++) {
		if (tweetIds.includes(tweets[i].id)) {
			newData.push(tweets[i]);
		} else {
			console.log("duplicate, nuke time");
			data.statuses.splice(i, 1);
		}
	}
	console.log(`remove duplicates: ${newData}`);
	return newData;
}

//unique from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function textFilter(tweets) {
	let spliceList = [];
	for (let i = 0; i < tweets.length; i++) {
		if (tweets[i].text.includes(searchString)) spliceList.push(tweets[i]);
	}
	return spliceList;
}

// sorts an array of tweets chronologically
function sortDate(tweets) {
	tweets.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	sortedTweets = tweets;
	console.log(`sort tweets${sortedTweets}`);
	return sortedTweets;
}

// deletes all tweets from tweetContainer
function refreshTweets() {
	while (tweetContainer.firstChild)
		tweetContainer.removeChild(tweetContainer.firstChild);
}

function cleanDate(date) {
	let new_date = moment(date).format("MMM Do YY");
	if (new_date[5] === "s") new_date = new_date.slice(0, 5);
	else if (new_date[6] === "t") new_date = new_date.slice(0, 6);
	return new_date;
}
