const express = require('express')
const {
  postData,
  getData,
  getSingle,
  updateSingle,
  deleteSingle,
} = require('../controllers/Controllers')
const router = express.Router()

router.route('/subscriptions').get(getData).post(postData)
router
  .route('/subscriptions/:id')
  .get(getSingle)
  .patch(updateSingle)
  .delete(deleteSingle)

module.exports = router
