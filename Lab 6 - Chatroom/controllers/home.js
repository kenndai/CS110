// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.

const getHome = (req, res) => {
	// do any work you need to do, then
	res.render("home", { title: "home" });
};

module.exports = {
	getHome,
};
