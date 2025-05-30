import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;         // It will firstly check .env file , and use the PORT described there , if not found there , then it will use the PORT defined here
app.use(express.json());

let greetData = [];
let nextId = 1; // just a way to uniquely identify data
// adding a new greeting data
app.post("/greetings", (req, res) => {
  // always prefer to use the post request in express , when you are using database
  const { say, time } = req.body;
  const LetsGreet = { id: nextId++, say, time };
  greetData.push(LetsGreet);
  res.status(201).send(LetsGreet);
});

// see all the greeting data
app.get("/greetings", (req, res) => {
  res.status(200).send(greetData);
});

// route to get the only greeting data with perticular id
app.get("/greetings/:id", (req, res) => {
  const reqGreet = greetData.find(
    (greet) => greet.id === parseInt(req.params.id)
  ); // NOTE -> when we have to extract something from the url , we use the params , and it gives in string formnat , but here id is in int format , so , parseINT is used
  if (!reqGreet) {
    return res.status(404).send("Req Greet is not found");
  }
  res.status(200).send(reqGreet);
});

// update greet data
app.put("/greetings/:id", (req, res) => {
  const ReqGreet = greetData.find(
    (greet) => greet.id === parseInt(req.params.id)
  );
  if (!ReqGreet) {
    return res.status(404).send("Required Greet is not found to update");
  }

  const { say, time } = req.body;
  ReqGreet.say = say; // The new say
  ReqGreet.time = time; // The new time to say
  res.status(200).send(ReqGreet);
});

// for deleting any data
app.delete("/greetings/:id", (req, res) => {
  const index = greetData.findIndex(
    (greet) => greet.id === parseInt(req.params.id)
  );
  if (index === -1) {
    return res.status(404).send("Not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port} ... `);
});
