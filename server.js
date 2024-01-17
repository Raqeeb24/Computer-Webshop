import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import computers from './backend/api/computers.route.js';
import authenticated from './backend/api/auth.route.js';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const MongoStore = connectMongoDBSession(session);

app.use(cors({
  origin: process.env.ORIGIN,
  methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
  credentials: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set("trust proxy", 1);

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
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}));

app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.post('/api/test', (req, res) => {
  try {
    req.session.testData = req.body.name;
    res.json({ message: "Data stored" });
  } catch (e) {
    console.log(`Failed to post: ${e}`);
  }
});

app.get('/api/test', (req, res) => {
  const testDAta = req.session.testData || "no data found";
  console.log(`node_env: ${process.env.NODE_ENV}`);
  res.json({ message: testDAta });
});


app.use("/api/computers", computers);
app.use("/api/secured", authenticated);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));

export default app;