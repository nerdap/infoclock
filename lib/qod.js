
function getQuoteOfTheDayMessage(callback) {
	var url = "http://api.theysaidso.com/qod?category=inspire";
	httpGet(url, function(response) {
		json = JSON.parse(response);
		quote = json.contents.quotes[0].quote;
		author = json.contents.quotes[0].author;
		callback(
			"Quote of the day: " +
			quote +
			" - " +
			author +
			"."
		);
	});
}