var express=require("express");
var bookRouter=express.Router();

/**get book page */
 bookRouter //.route('/books/:bookId?')
 .get('/getInfo/:bookId?',function(req,res){
	 //.. 
	 res.send('response get '+req.params.bookId);
 })
 .post(function(req,res){
	 res.send('response post');
	 
 });
 
module.exports = bookRouter;
