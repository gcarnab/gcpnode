const mongoose = require("mongoose")

/* const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    console.log(`MongoDB connected : ${con.connection.host}`)
  } catch (err) {
    console.log(`###### MongoDB Connection error : ${con.connection.host}`)
    console.log(err)
    //process.exit(1);
  }
} */
var con = mongoose.connect(process.env.DB_MONGO_URI, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.")
  } else {
    console.log("##### Error in MongoDB connection : " + err)
  }
})

module.exports = con
