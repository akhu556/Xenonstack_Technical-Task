const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log('successful');
}).catch((e) => {
    console.log(e);
})