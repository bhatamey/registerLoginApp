module.exports = {
    database: process.env.MONGO_DB || "mongodb://localhost:27017/meanAppDB",
    secret: "yoursecret",
}