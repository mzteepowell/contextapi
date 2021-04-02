const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());
let newProducts = [{}]
let products = [
	{
		id: 1,
		title: 'Cannon x500',
		price: 25.99,
		image:
			`https://theangelconsultant.com/buildweek/camera.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 2,
		title: 'Sony 3000',
		price: 35.99,
		image: `https://theangelconsultant.com/buildweek/laptop2.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 3,
		title: 'Macbook Pro',
		price: 60.99,
		image: `https://theangelconsultant.com/buildweek/laptop.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 4,
		title: 'Production Microphone',
		price: 40.00,
		image: `https://theangelconsultant.com/buildweek/microphone2.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 5,
		title: 'Ikon PHT',
		price: 99.00,
		image: `https://theangelconsultant.com/buildweek/video-camera.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 6,
		title: 'Commercial Video Camera',
		price: 150.00,
		image: `https://theangelconsultant.com/buildweek/video-camera2.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 7,
		title: 'DJ Turntable',
		price: 300.00,
		image: `https://theangelconsultant.com/buildweek/turntable.jpg`,
		descripton: "Please add description to data object"
	},
	{
		id: 8,
		title: 'Drone Spy',
		price: 215.00,
		image: `https://theangelconsultant.com/buildweek/drone.jpg`,
		descripton: "Please add description to data object"
	}
];

let productId = products.length;

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.filter(product => `${product.id}` === req.params.id)[0];
  res.status(200).json(product);
});

app.post("/api/products", (req, res) => {
  if (req.body.title !== undefined) {
    const newProduct = req.body;
    newProduct["id"] = productId;
    products.push(newProduct);
  }
  ++productId;
  res.status(201).json(products);
});

app.post("/api/newproduct", (req, res) => {
  if (req.body.title !== undefined) {
    const newProduct = req.body;
    newProduct["id"] = productId;
    newProducts.push(newProduct);
  }
  ++productId;
  res.status(201).json(products);
});

app.put("/api/products/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the product id");
  if (
    req.body.id === undefined ||
    !req.body.title ||
    !req.body.director ||
    !req.body.metascore 
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  products = products.map(product => {
    if (`${product.id}` === req.params.id) {
      return req.body;
    }
    return product;
  });
  res.status(200).send(products);
});

app.delete("/api/products/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the product id");
  products = products.filter(product => `${product.id}` !== req.params.id);
  res.status(202).send(products);
});

app.get("/login", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});