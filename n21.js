const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to server");

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Acknowledged connection");

    // Get a reference to the database
    const database = client.db('Auction_system');
    console.log('Database "Auction_system" created');

    // Create a new collection
    const collection = database.collection('Products');
    console.log('Collection "Products" created');

    const result = await collection.insertMany([{
      pid:1,
      pname:'beautiful paintings',
      starting_cost:100
    },
    {
      pid: 2,
      pname: 'rare sculptures',
      starting_cost: 150
    },
    {
      pid: 3,
      pname: 'antique jewelry',
      starting_cost: 200
    }]);
    console.log(result);

    const dele=await collection.deleteOne({pname:'beautiful paintings'});
    console.log(`Deleted ${dele.deletedCount} document(s)`);

    console.log(`Inserted document with _id: ${result.insertedId}`);

    const res = await collection.updateOne(
        { pname: 'beautiful paintings' }, // Filter: Update the document with the name "Immanuvel"
        { $set: { starting_cost: 200 } } // Update: Set the status field to "unpaid"
      );
      
      console.log(`Modified ${res.modifiedCount} document(s)`);
  
  

  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
    console.log("Connection closed");
  }
}

run().catch(console.dir);
