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
  res.header("Access-Control-Expose-Headers", "Set-Cookie");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(session({
  path: "/",
  name: "cart.sid",
  secret: process.env.TOKEN,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    uri: process.env.FULL_URI,
    collection: "sessions"
  }),
  cookie: {
    httpOnly: true,
    maxAge: 360000,
    secure: true,
    sameSite: 'strict'
  }
}));

app.use("/api/v1/computers", computers);

app.post('/api/v1/test', (req, res) => {
  try {
    req.session.testData = 'Hello, session!';
    res.json({ message: 'Data stored in session.' });
  } catch (error) {
    console.error('Error setting session data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/v1/test-retrieve', (req, res) => {
  const testData = req.session.testData || 'No data found in session.';
  res.json({ message: testData });
});


app.use("*", (req, res) => res.status(404).json({ error: "not found!!!" }));

export default app;