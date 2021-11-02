const express = require('express');
const library = require('../controller/farmpler');

const router = express.Router();

router.route('/')
  .get(async (req, res, next)   => {
    library.ListAll(res);
  })
  .post(async (req, res, next)  => {
    library.Insert(req, res);
  });

router.route('/:id')
  .get(async (req, res, next)   => {
    //library.Count(req, res);
    library.List(req, res);
  })
  .post(async (req, res, next)  => {
    library.Transactions(req, res);
  })
  .patch(async (req, res, next)  => {
    library.Update(req, res);
  })
  .delete(async (req, res, next)  => {
    library.Delete(req, res);
  });

module.exports = router;