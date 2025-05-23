const express =require("express");
const mongoose= require("mongoose");
require("dotenv").config();
const cors = require("cors")
const app = express();
app.use(cors())

app.use(express.json())
const userRoute= require("./routes/userRoutes");
app.use("/user", userRoute);
const port = process.env.PORT || 3000


mongoose.connect(process.env.LOCAL_DB)
.then(()=>{
    console.log("Database connected successfully")
}).catch((err) =>{
    console.log("Error occurred while connecting to database")
})

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
})

