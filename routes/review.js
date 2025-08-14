const express = require("express");
const router = express.Router({mergeParams:true});
const Review = require("../models/review.js")
const wrapAsync = require("../utils/WrapAsync.js")
const {validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");


const Listing = require("../models/listing.js")
const reviewController = require("../controllers/reviews.js")








//reviews post route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewCnotroller.createReview));

// delete review post
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewCnotroller.destroyReview))

module.exports = router