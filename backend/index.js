const express = require("express");
const app = express();
const mongodb = require("./db");
const PORT = 5000;
const CreateUser = require("./routes/CreateUser");
const DisplayData=require("./routes/DisplayData")

mongodb();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
    )
    next()
})
app.use(express.json());
app.use("/api", CreateUser);
app.use("/api", DisplayData);
app.get("/", (req, res) => {
    res.send(`Success`);
});

app.listen(PORT, () => {
    console.log(`Connection is successful at ${PORT}`);
});
