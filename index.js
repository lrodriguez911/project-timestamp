// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use((req,res, next) => {console.log(`${req.method} ${req.path} - ${req.ip}`); next()})
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date", (req, res) => {
  let response = req.params.date;
  if(response.includes('-'))
  {res.json(
  {unix: new Date(response).getTime(),
  utc: new Date(response).toUTCString()
}) } 
  if(!isNaN(Date.parse(response))) 
  { res.json({ error : "Invalid Date" })}
  if(Number.isInteger(response)){
    res.json({
      unix: response,
      utc: new Date(response).toUTCString()
    })
  }
})


// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
