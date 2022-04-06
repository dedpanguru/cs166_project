const express = require("express");
const session = require("express-session");

const ONE_HOUR = 1000 * 60 * 60;

const {
  PORT = 5000,
  SESS_NAME = "sid",
  SESS_LIFETIME = ONE_HOUR,
  SESS_SECRET = "secret",
} = process.env;

const users = [{ id: 1, name: "Test", password: "test" }];

const app = express();

// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.use(
  session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
    },
  })
);

app.get("/home", (req, res) => {
  // console.log(req.session);
  // const { userId } = req.session;
  res.send("Homepage.");
});

app.get("/login", (req, res) => {});

app.get("/register", (req, res) => {});

app.post("/login", (req, res) => {});

app.post("/register", (req, res) => {});

app.post("/logout", () => {});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
