const express = require("express");
const path = require("path");
const CryptoJS = require("crypto-js"); 
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
const Product = require("./models/Product");
const dbConnect = require("./models/dbConfig");

const app = express();
const PORT = 3000;


const ESEWA_SECRET_KEY = "8gBm/:&EnhH.1/q("; 
const PRODUCT_CODE = "EPAYTEST";


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));


dbConnect();


app.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("home", { products });
});


app.post("/buy", async (req, res) => {
  const { _id } = req.body;

  const product = await Product.findById(_id);
  if (!product) return res.status(404).send("Product not found");

  const amount = product.price;
  const transaction_uuid = uuidv4();

  
  const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${PRODUCT_CODE}`;

  
  const hash = CryptoJS.HmacSHA256(message, ESEWA_SECRET_KEY);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

res.render("paymentForm", {
  product,
  amount,
  transaction_uuid,
  product_code: PRODUCT_CODE,
  hashInBase64
});

});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
