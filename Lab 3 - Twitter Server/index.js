const url =
	"http://ec2-18-209-247-77.compute-1.amazonaws.com:3000/feed/random?q=weather";

async function getTweets() {
	const res = await axios.get(url);
	return res;
}

//not extensively tested, might have bugs
function removeDuplicates(data) {
	let tweetIds = [];
	let newData = [];
	for (const i in data.statuses) {
		tweetIds.push(data.statuses[i].id);
	}
	tweetIds.filter(onlyUnique);
	for (let i = 0; i < data.statuses.length; i++) {
		if (tweetIds.includes(data.statuses[i].id)) {
			newData.push(data.statuses[i]);
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

function refreshTweets() {
	// feel free to use a more complicated heuristics like in-place-patch, for simplicity, we will clear all tweets and append all tweets back
	// {@link https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript}
	// while (tweetContainer.firstChild) {
	//     tweetContainer.removeChild(tweetContainer.firstChild);
	// }
	getTweets()
		.then(data => {
			const tweetList = document.createElement("ul");
			//things in tweet needed:
			//tweet_id, username, tweet text
			// {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement}
			// append the tweetList to the tweetContainer
			// {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild}
			tweetContainer.appendChild(tweetList);
			// all tweet objects (no duplicates) stored in tweets variable
			tweets = removeDuplicates(data);
			filteredResult = textFilter(tweets);
			// filter on search text
			// {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter}
			// create an unordered list to hold the tweets

			// filteredResult = tweets.filter(searchString);
			// sort by date
			// {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort}
			let earliestDate = new Date("2011-09-26T12:10:46+00:00");
			console.log(earliestDate);
			for (const i in tweets) {
				if (tweets[i].created_at < earliestDate) {
					console.log("date is lit");
				}
			}
			// console.log(sortedResult);
			// execute the arrow function for each tweet
			// {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach}
			// sortedResult.forEach(tweetObject => {
			//     // create a container for individual tweet
			//     const tweet = document.createElement("li");

			//     // e.g. create a div holding tweet content
			//     const tweetContent = document.createElement("div");
			//     // create a text node "safely" with HTML characters escaped
			//     // {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode}
			//     const tweetText = document.createTextNode(tweetObject.text);
			//     // append the text node to the div
			//     tweetContent.appendChild(tweetText);

			//     // you may want to put more stuff here like time, username...
			//     tweet.appendChild(tweetContent);

			//     // finally append your tweet into the tweet list
			//     tweetList.appendChild(tweet);
			// });
		})
		.catch(err => console.log("rejected:", err.message));
}

const displayTweets = async () => {
	const res = await getTweets();
	tweets = res.data.statuses;
	console.log(tweets);
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
		authorName.className = "tweet-author-name";
		authorName.innerText = `${tweet.user.name} `;
		tweetHandle.className = "tweet-handle";
		tweetHandle.innerText = `@${tweet.user.screen_name}`;

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
