async function main() {
  const MongoClient = require("mongodb").MongoClient
  const uri =
    "mongodb+srv://gcarnab:gcarnab@cluster0.s7mj1.mongodb.net/CRUD?retryWrites=true&w=majority"
  const client = new MongoClient(uri, { useNewUrlParser: true })
  client.connect((err) => {
    const collection = client.db("test").collection("devices")
    // perform actions on the collection object
    client.close()
  })
}

main().catch(console.error)

async function findListings(client, resultsLimit) {
  const cursor = client
    .db("CRUD")
    .collection("usersdbs")
    .find()
    .limit(resultsLimit)

  const results = await cursor.toArray()
  if (results.length > 0) {
    console.log(`Found ${results.length} user(s):`)
    results.forEach((result, i) => {
      date = new Date(result.last_review).toDateString()

      console.log()
      console.log(`${i + 1}. name: ${result.name}`)
      console.log(`   _id: ${result._id}`)
      console.log(`   email: ${result.bedrooms}`)
    })
  }
}
