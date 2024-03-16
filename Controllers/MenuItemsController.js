

// const Menuitems = require('../Models/Menu-items');
const Restaurants = require("../Models/restaurantsModel");


// exports.getMenuItemsByRestaurant = async(req, res) => {
//     const result = await Restaurants.find({restaurant_id : req.params.id});
//     try{
//         res.status(200).json(result);
//     }catch(err){
//         res.status(500).send(err);
//     }
// }
exports.getMenuItemsByRestaurant = async(req, res) => {
const resId = req.params.id; 
// if (!mongoose.Types.ObjectId.isValid(resId)) {
//     return res.status(400).json({ error: "Invalid 'id' parameter" });
// }
try {
    const restaurant = await Restaurants.findById(resId);

    if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
    }
    const menu_items = restaurant.menu_items;

    res.status(200).json({
        message: "Restaurant fetched successfully",
        restaurant: restaurant,
        menu_items: menu_items, // Include mealitems in the response
    });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};