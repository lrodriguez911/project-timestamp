// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

//settings 
app.set('port', process.env.PORT || 5000);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use((req, res, next) => {
  next();
});
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
}
)
app.get("/api/:date", (req, res) => {
  let response = req.params.date;
  let date_res = new Date(response);
  let date_Unix = date_res.getTime();
  let date_UTC = date_res.toUTCString();
  if(date_res.toString() !== 'Invalid Date')  
  {
    res.json(
    {unix: date_Unix,
  utc: date_UTC}
  )} 
if(date_res !== new Date(parseInt(response)) && !response.includes('a')){
    res.json(
    {unix: new Date(parseInt(response)).getTime(),
  utc: new Date(parseInt(response)).toUTCString()}
  ) }
    if(date_res.toString() === 'Invalid Date')
  {res.json({error: 'Invalid Date'})}

})


// listen for requests :)
const listener = app.listen(app.get('port'), function () {
  console.log("Your app is listening on port " + listener.address().port);
});
