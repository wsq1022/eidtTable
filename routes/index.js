var express = require('express');
var router = express.Router();
var mysql=require("./mysql.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("qaaaaa");
  res.render('index.html', { title: 'Express' });
});

router.post("/select",function (req,res) {
    mysql.query("select * from demo1",function (err,result) {
        res.send(JSON.stringify(result));
    })
})

router.post("/del",function (req,res) {
  var id=(req.body.id);
  mysql.query("delete from demo1 where id="+id,function (err,result) {
      if(result.affectedRows>0){
        res.end("ok")
      }
  })
})
router.post("/edit",function (req,res) {

    var id=req.body.id;
    var attr=req.body.attr;
    var val=req.body.val;
    mysql.query(`update demo1 set ${attr}='${val}' where id=${id}`,function (err,result) {
        if(result.affectedRows>0){
          res.end("ok");
        }
    })
})

module.exports = router;
