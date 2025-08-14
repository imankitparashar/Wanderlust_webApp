if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"))
const flash = require("connect-flash");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"))

main()
    .then((res) => { console.log("success") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}
app.get("/", (req, res) => {
    res.redirect("/listings")
})
 
//mongo store for permanent storage for session
const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto:{
        secret:process.env.SECRET, //same as session secret
    },
    touchAfter: 24*3600,
})
store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})


const sessionOption = ({
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
         expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    }
})



app.use(session(sessionOption))
//for passport
app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(flash());
app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user;
    next();
})

// app.get("/demoUser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"imankitparashar@gmail.com",
//        username : "theankitparashar_"
//     })
//    let registerUser = await User.register(fakeUser,"helloworld")
//    res.send(registerUser)
// })


app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)
app.use((req, res, next) => {
    next(new ExpressError(404, "page not found"))
}
)
app.use((err, req, res, next) => {
    let { status = 500, message = "something error" } = err;
    //    res.status(status).send(message);
    res.status(status).render("error.ejs", { err });
})















app.listen(8080, () => {
    console.log("server is listening on 8080");
})