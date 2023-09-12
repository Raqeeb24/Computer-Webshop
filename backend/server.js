import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import computers from './api/computers.route.js'
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

dotenv.config();
const app = express();
const MongoStore = connectMongoDBSession(session);

app.use(cors({
  origin: process.env.ORIGIN,
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header("Access-Control-Allow-Credentials", "true");
  //res.header("Access-Control-Expose-Headers", "Set-Cookie");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  name: "cart.sid",
  secret: process.env.TOKEN,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    uri: process.env.FULL_URI,
    collection: "sessions"
  }),
  cookie: {
    httpOnly: true,
    maxAge: 9000000,
    secure: process.env.NODE_ENV === 'production'
  }
}));

app.use(express.json());


app.post('/api/v1/test', (req, res) => {
  try {
      req.session.testData = req.body.name;
      res.json({message: "DAta stored"});
  } catch (e) {
      console.log(`Failed to post: ${e}`);
  }
});

app.get('/api/v1/test', (req, res) => {
  const testDAta = req.session.testData || "no data found";
  console.log(`production: ${process.env.NODE_ENV === 'production'}`);
  res.json({message: testDAta});
});


app.use("/api/v1/computers", computers);


app.use("*", (req, res) => res.status(404).json({ error: "not found!!!" }));

export default app;