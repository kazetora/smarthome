var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/remote', function(req, res, next){
  var params = req.query;
  console.log(params);
  if(typeof params == 'undefined' || typeof params.appliance == 'undefined' ||
      typeof params.cmd == 'undefined') {
        return res.send({status: -1, msg: 'Error'});
  }
  var socket = req.socket;
  socket.emit("smarthome/remote", params);
  res.send({status:0, msg:"OK"});
});

module.exports = router;
