const Listing = require("./models/listing.js")
const Review = require("./models/review.js")
const { listingSchema } = require("./schema.js")
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js")
module.exports.isLoggedIn = (req,res,next) =>{

if(!req.isAuthenticated()){
    //redirectUrl
    req.session.redirectUrl = req.originalUrl
    req.flash("error","you must be logged in to create listing!")
       return res.redirect("/login")
    }
   next();
    }

//because passport reset the session variables
  module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
   res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
  }


  // for authorization

  module.exports.isOwner = async(req,res,next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next()
  }

  // validation as a miidleware using joi
module.exports.listingValidate = (req, res, next) => {
      const { error } = listingSchema.validate(req.body)
      if (error) {
          let errMsg = error.details.map((el) => el.message).join(",")
          throw new ExpressError(400, errMsg);
      }
      else {
          next();
      }
  
  }

  // validation for review
  
module.exports.validateReview = (req,res,next) =>{
      let {error} = reviewSchema.validate(req.body);
      if(error){
          let errMsg = error.details.map((el)=>el.message)
          console.log(errMsg)
          throw new ExpressError(404,errMsg)
       
      }
       else {
          next();
      }
  }
//authorization for reviews
module.exports.isReviewAuthor =async (req,res,next)=>{
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
     req.flash("error","You are not author of this review")
     return  res.redirect(`/listings/${id}`);
  }
  next();
}