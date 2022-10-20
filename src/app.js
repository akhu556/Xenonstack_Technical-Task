const { hasSubscribers } = require("diagnostics_channel");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn")

const Register = require("./models/register");
const Contact = require("./models/contact");

const port = process.env.PORT || 3000

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path)
hbs.registerPartials(partials_path);


app.get("/", (req, res) =>{
    res.render("register");
})

app.get("/login", (req,res) =>{
    res.render("login");
})

app.get("/register", (req,res) => {
    res.render("register");
})

app.get("/home", (req,res) => {
    res.render("home");
})

app.get("/contact", (req,res) => {
    res.render("contact");
})

app.get("/shop", (req,res) => {
    res.render("shop");
})

app.get("/sproduct", (req,res) => {
    res.render("sproduct");
})

app.post("/register", async (req,res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if(password === cpassword){
            const registerUser = new Register({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.cpassword
            })

            const registered = await registerUser.save();
            res.status(201).render("login"  );
        }else{
            res.send("Password Does Not match");
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/contact", async(req, res) => {
    try {
        const contactUser = new Contact({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            text: req.body.text
        })

        const contacted = await contactUser.save();
        res.status(201).render("contact")
    } catch (error) {
        res.status(400).send(error);
    }
})

//Login
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if(useremail.password === password){
            res.status(201).render("home");
        }else{
            res.send("Invalid Login Details");
        }
    } catch (error) {
        res.status(400).send("Invalid Login Details");
    }
})
app.listen(port)