import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import computers from './api/computers.route.js'
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

import path from 'path'; 

dotenv.config();
const app = express();
const MongoStore = connectMongoDBSession(session);
const NODE_ENV = process.env.NODE_ENV;
const SAME_SITE = (NODE_ENV === 'production') ? 'none' : 'lax';

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
  saveUninitialized: false,
  store: new MongoStore({
    uri: process.env.FULL_URI,
    collection: "sessions"
  }),
  cookie: {
    maxAge: 9000000,
    secure: NODE_ENV === 'production',
    httpOnly: true
  }
}));

app.use(express.json());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.post('/api/test', (req, res) => {
  try {
      req.session.testData = req.body.name;
      res.json({message: "DAta stored"});
  } catch (e) {
      console.log(`Failed to post: ${e}`);
  }
});

app.get('/api/test', (req, res) => {
  const testDAta = req.session.testData || "no data found";
  console.log(`node_env: ${NODE_ENV}`);
  res.json({message: testDAta});
});


app.use("/api/computers", computers);



if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname ,'frontend', 'build', 'index.html')));
} else {
  app.use("*", (req, res) => res.status(404).json({ error: "not found!!!" }));

}

export default app;