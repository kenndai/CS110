let searchString = "";
const url =
	"http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";
let timer;

const userTweetTemplate = document.querySelector("[data-user-tweet]");
const searchForm = document.getElementById("search-form");
const searchBar = document.getElementById("search-bar");
const startBtn = document.getElementById("start-poll");
const stopBtn = document.getElementById("stop-poll");

searchForm.addEventListener("submit", e => {
	e.preventDefault();
	searchString = searchBar.value.trim().toLowerCase();
	console.log(searchString);
});

startBtn.addEventListener("click", () => {
	displayTweets();
	timer = setInterval(displayTweets, 10000);
	console.log("set interval");
});

stopBtn.addEventListener("click", () => {
	clearInterval(timer);
	console.log("cleared interval");
});

async function getTweets() {
	const res = await axios.get(url);
	return res;
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
	console.log(newData);
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

function sortDate(tweets) {
	tweets.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
	sortedTweets = tweets;
	console.log(sortedTweets);
	return sortedTweets;
}

async function refreshTweets() {
	// feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
	// {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
	while (tweetContainer.firstChild) {
		tweetContainer.removeChild(tweetContainer.firstChild);
	}
}

async function displayTweets() {
	const res = await getTweets();
	tweets = res.data.statuses;
	console.log(tweets);
	tweets = removeDuplicates(tweets);
	tweets = textFilter(tweets);
	tweets = sortDate(tweets);
	const tweetContainer = document.getElementById("tweet-container");
	for (tweet of tweets) {
		const newTweet = userTweetTemplate.content.cloneNode(true).children[0];
		let pfp = newTweet.querySelector(".tweet-pfp");
		pfp.src = tweet.user.profile_image_url;
		let authorName = newTweet.querySelector(".tweet-author-name");
		authorName.innerText = `${tweet.user.name} `;
		let tweetHandle = newTweet.querySelector(".tweet-handle");
		tweetHandle.innerText = `@${tweet.user.screen_name}`;
		let tweetContent = newTweet.querySelector(".tweet-content");
		tweetContent.innerText = tweet.text;
		tweetContainer.appendChild(newTweet);
	}
}
