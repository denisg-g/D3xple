const express = require('express')
const router = express.Router()

router.get('/',  (req, res) => {
    res.render("home/index");
})

router.get('/home/index', (req, res) => {
    res.render("home/index1",  { layout: 'layouts/segLayout' });
})

router.get('/home/index2', (req, res) => {
    res.render("home/index2",  { layout: 'layouts/terLayout' });
})


module.exports = router;