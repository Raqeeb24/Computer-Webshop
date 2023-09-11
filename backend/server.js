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
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true
}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
    sameSite: 'strict',
    httpOnly: true,
    maxAge: Date.UTC(2023, 8, 31, 0, 0, 0, 0) - Date.now(),
    secure: false
  }
}));

app.use("/api/v1/computers", computers);

app.post('/api/v1/test', (req, res) => {
  req.session.testData = 'Hello, session!';
  res.json({ message: 'Data stored in session.' });
});

app.get('/api/v1/test-retrieve', (req, res) => {
  const testData = req.session.testData || 'No data found in session.';
  res.json({ message: testData });
});


app.use("*", (req, res) => res.status(404).json({ error: "not found!!!" }));

export default app;