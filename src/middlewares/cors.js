const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: [
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:63342',
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;
