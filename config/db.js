const mongoose = require("mongoose");
const uri =process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MONGODB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
const allowCors = fn=> async(req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if(req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
};

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}


module.exports = connectDB, allowCors(handler);
