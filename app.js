const http = require("http");
const fs = require("fs");
const { URL } = require("url");
const replaceTemplate = require("./modules/replaceTemplate.js");
const slugify = require("slugify");


const indexPage = fs.readFileSync(
  `${__dirname}/src/templates/index.html`,
  "utf-8"
);

const cardsTemplate = fs.readFileSync(
  `${__dirname}/src/templates/card-template.html`,
  "utf-8"
);

const productTemplate = fs.readFileSync(
  `${__dirname}/src/templates/product-template.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productsData = JSON.parse(data);



const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const requestURL = new URL(req.url, baseURL);

  const pathName = requestURL.pathname;
  const query = requestURL.searchParams.get("id");

  if (pathName === "/" || pathName === "") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = productsData
      .map((el) => replaceTemplate(cardsTemplate, el))
      .join("");
    const output = indexPage.replace("{%CARDS%}", cardsHtml);
    res.end(output);
  } else if(pathName === "/product"){
    const product = productsData[query];
    res.writeHead(200,{"Content-type":"text/html"});
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
  } else if(pathName === '/about'){
    
  }
});

server.listen(8000, "127.0.0.1", () => {

  console.log("Listening to request on port 8000...");
  
});
