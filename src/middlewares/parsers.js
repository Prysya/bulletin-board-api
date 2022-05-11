const router = require('express').Router();
const express = require('express');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: false,
  }),
);

module.exports = router;
