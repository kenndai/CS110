// Controller handler to handle functionality in home page
// Example for handle a get request at '/' endpoint.

const Room = require("../models/roomModel");

/*
function getHome(request, response){
  Room.find().lean().then(items => {
    response.render('home',{title: 'home', rooms: items, isAvailable:true});
  });
  // do any work you need to do, then
}
*/

// @desc    Get all rooms
// @route   GET /
// @access  Public
const getHome = async (req, res) => {
	const rooms = await Room.find().lean();
	res.status(200).json(rooms);
	// res.render("home", { title: "home" });
};

module.exports = {
	getHome,
};
