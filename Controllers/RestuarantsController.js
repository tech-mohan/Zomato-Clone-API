

const Restaurants = require("../Models/restaurantsModel");

// This method will return all restaurant details
exports.getAllRestuarant = async (req, res) => {
    const list = await Restaurants.find();
    try{
        res.status(200).json(list);
    }catch(err){
        res.status(500).send(err);
    }
}
// This method will returns restaurants list based on location
exports.getRestaurantByLocation = async (req, res) => {
    const list = await Restaurants.find({location_id : req.params.id});
    try{
        res.status(200).json(list);
    }catch(err){
        res.status(500).send(err);
    }
}
// This method will returss restaurant details by restaurant ID.
exports.getRestaurantById = async (req, res) => {
    const restaurant = await Restaurants.findById(req.params.id);
    try{
        res.status(200).json(restaurant);
    }catch(err){
        res.status(500).send(err);
    }
}
// This is method will return filtered restaurant based on some values
exports.filter = async (req, res) => {

    let {mealtype_id, locations, cuisine, lcost, hcost, sort, page } = req.body;
    console.log("data is", req.body);
  
    sort = sort ? sort : 1;
    page = page ? page : 1;
  
    let ItemsPerPage = 2;
  
    let startIndex = ItemsPerPage * page - ItemsPerPage;
    let endIndex = ItemsPerPage * page + 1;
  
    let filterObj = {};
  
    mealtype_id && (filterObj['mealtype_id'] = mealtype_id);
    locations && (filterObj['location_id'] = locations);
    cuisine && (filterObj['cuisine.id'] = { $in:cuisine });
    lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost });
  
    Restaurants.find(filterObj).sort({ min_price: sort }).then(response => {
        let paginatedResponse = response.slice(startIndex, endIndex);
        let arr = [];
        for (let i=1; i<=Math.ceil(response.length / ItemsPerPage); i++){
            arr.push(i);
        }
  
        res.status(200).json({
          message: "Restaurants added successfully",
          restaurants: paginatedResponse, 
          pageCount: arr,
          currentPage: page
        });
  })
  
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
    };



//     let mealtype_id = req.body;
//     let location_id = req.body.location_id;
//     let cuisine_id = req.body.cuisine_id;
//     let hcost = req.body.hcost;
//     let lcost = req.body.lcost;
//     let sort = req.body.sort ? req.body.sort : 1;
//     let page = req.body.page ? req.body.page : 1;
   
//     let itemPerPage = 2;
//     let startIndex = (page * itemPerPage) - itemPerPage;
//     let endIndex = (page * itemPerPage);
    
    

//     let payload = {};

//     if(mealtype_id){
//         payload = {mealtype_id: {$elemMatch: { mealtype: mealtype_id}}};
//     }
//     if(mealtype_id && location_id){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             location_id : location_id
//         }
//     }
//     if(mealtype_id && cuisine_id ){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
//         }
//     }
//     if(mealtype_id && hcost && lcost){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             cost : {$lte: hcost, $gte : lcost}
//         }
//     }
//     if(mealtype_id && cuisine_id && hcost && lcost){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             cost : {$lte: hcost, $gte : lcost},
//             cuisine_id: {$elemMatch: { cuisine: cuisine_id}},
//         }
//     }
//     if(mealtype_id && location_id && cuisine_id){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             location_id : location_id,
//             cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
//         }
//     }
//     if(mealtype_id && location_id && hcost && lcost){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             location_id : location_id,
//             cost : {$lte: hcost, $gte : lcost}
//         }
//     }
//     if(mealtype_id && location_id && cuisine_id && hcost && lcost){
//         payload = {
//             mealtype_id: {$elemMatch: { mealtype: mealtype_id}},
//             location_id : location_id,
//             cost : {$lte: hcost, $gte : lcost},
//             cuisine_id: {$elemMatch: { cuisine: cuisine_id}}
//         }
//     }

//     let list = await Restaurants.find(payload).sort({cost : sort});
//         try{
//         res.status(200).json(list);
//     }catch(err){
//         res.status(500).send(err);
//     }

// };

