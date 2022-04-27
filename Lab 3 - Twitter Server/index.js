var searchString = "weather";
const url =
	"http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";

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
		if (tweets[i].text.includes(searchString)) {
			spliceList.push(tweets[i]);
		}
	}
	return spliceList;
}
function sortDate(tweets){
	tweets.sort((a,b)=>(a.created_at > b.created_at)?1:-1)
	sortedTweets = tweets;
	console.log(sortedTweets)
	return sortedTweets;
}
async function refreshTweets() {
	// feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
	// {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
	while (tweetContainer.firstChild) {
	    tweetContainer.removeChild(tweetContainer.firstChild);
	}
}

const displayTweets = async () => {
	const res = await getTweets();
	tweets = res.data.statuses;
	console.log(tweets);
	tweets = removeDuplicates(tweets);
	tweets = textFilter(tweets);
	tweets = sortDate(tweets);
	const tweetContainer = document.getElementById("tweet-container");
	for (tweet of tweets) {
		let tweetEl = document.createElement("article");
		tweetEl.className = "tweet";

		// tweet pfp
		let pfpWrapperEl = document.createElement("div");
		let pfpEl = document.createElement("img");
		pfpWrapperEl.className = "tweet-pfp-wrapper";
		pfpEl.className = "tweet-pfp";
		pfpEl.src = tweet.user.profile_image_url;

		// tweet author
		let authWrapperEl = document.createElement("div");
		authWrapperEl.className = "tweet-author-wrapper";

		let authorName = document.createElement("span");
		let tweetHandle = document.createElement("span");
		let tweetDate = document.createElement("span");
		authorName.className = "tweet-author-name";
		authorName.innerText = `${tweet.user.name} `;
		tweetHandle.className = "tweet-handle";
		tweetHandle.innerText = `@${tweet.user.screen_name}`;
		tweetDate.className = "tweet-date";
		console.log(tweet.created_at);
		tweetDate.innerText =`test ${tweet.created_at}`;

		// tweet text
		let tweetTextEl = document.createElement("div");
		let tweetContentEl = document.createElement("span");
		tweetTextEl.className = "tweet-text";
		tweetContentEl.className = "tweet-content";
		tweetContentEl.innerText = tweet.text;

		tweetContainer.appendChild(tweetEl);
		tweetEl.append(pfpWrapperEl, tweetTextEl);
		pfpWrapperEl.appendChild(pfpEl);
		tweetTextEl.append(authWrapperEl, tweetContentEl);
		authWrapperEl.append(authorName, tweetHandle);
	}
};
