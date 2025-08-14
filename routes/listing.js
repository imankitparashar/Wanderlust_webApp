const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js")
const Listing = require("../models/listing.js")
const {isLoggedIn} = require("../middleware.js")
const {isOwner,listingValidate} = require("../middleware.js")
const listingController = require("../controllers/listing.js")
const multer  = require('multer')
// for parsing multipart form data we use multer library / package
const{storage}= require('../cloudConfig.js');


//for where we want to store the image means set the destination
const upload = multer({storage})
//index route and create listing route
router
     .route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
  upload.single("listing[image]"),
  listingValidate,
  wrapAsync(listingController.createListing)
);
// for filter functionality
router.get("/search/trending", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Trending", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Rooms", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Rooms", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/IconicCities", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Iconic Cities", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Mountain", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Mountain", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Castles", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Castles", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/AmazingPool", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Amazing Pool", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Camping", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Camping", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Farms", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Farms", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Arctic", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Arctic", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});
router.get("/search/Deserts", async (req, res) => {
    let allListings = await Listing.find({
        category: { $regex: "Deserts", $options: "i" }
    });
    res.render("listings/search.ejs", { allListings });
});





// this is implement by me 
// router.get("/search",async(req,res)=>{
// let {title} = req.query;

// let allListings = await Listing.find(req.query)
// res.render("listings/search.ejs",{allListings});
// })
// this is for case insesitive
//for search functionality on the basis of category
router.get("/search", async (req, res) => {
    let { category } = req.query;
    
    let query = {};
    if (category) {
        query.category = { $regex: category, $options: "i" }; // "i" = ignore case
    }

    let allListings = await Listing.find(query);
    res.render("listings/search.ejs", { allListings });
});
 

//new listing form
router.get("/new",isLoggedIn,listingController.renderNewForm)

//show  update and delete listing  route




router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single("listing[image]"), listingValidate, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing))


//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))




module.exports = router;
