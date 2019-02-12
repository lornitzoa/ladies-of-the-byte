const express = require("express");
const router = express.Router();
const NounProject = require('the-noun-project')

nounProject = new NounProject({
  key: 'c6bed03aeb604f4eac8be077e9d9e31e',
  secret: 'e0854062025240839e319e527a65cff9'
})

router.get(`/:searchParam`, (req, res) => {
  // console.log(req.params.searchParam);
  nounProject.getIconsByTerm(req.params.searchParam, (err, data) => {
  	// console.log(data.icons);
    res.json(data)
  })

})

module.exports = router
