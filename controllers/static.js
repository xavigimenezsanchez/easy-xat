var express = require('express');
var router = express.Router();

var options = {
    root: __dirname + '/../layouts'
};

router.use(express.static(__dirname+'/../assets'));
router.use(express.static(__dirname+'/../templates'));

router.get('*', function(req,res) {
    res.sendFile('xatApp.html', options);
});

module.exports = router;