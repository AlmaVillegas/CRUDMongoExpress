const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

var Post = require("../models/post");

app.get('/posts', (req, res) => {
  Post.find({}, 'nombre direccion telefono', function (error, posts) {
	  if (error) { console.error(error); }
	  res.send({
			posts: posts
		})
	}).sort({_id:-1})
})

app.post('/add_post', (req, res) => {
  var db = req.db;
  var nombre= req.body.nombre;
	var direccion = req.body.direccion;
	var telefono = req.body.telefono;
	var new_post = new Post({
		nombre: nombre,
    direccion: direccion,
    telefono: telefono
	})

	new_post.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
})
app.put('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'nombre direccion telefono', function (error, post) {
      if (error) { console.error(error); }
      post.nombre = req.body.nombre
      post.direccion = req.body.direccion
      post.telefono = req.body.telefono
      post.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })
  app.delete('/posts/:id', (req, res) => {
    var db = req.db;
    Post.remove({
      _id: req.params.id
    }, (err, post)=>{
      if (err)
        res.send(err)
      res.send({
        success: true
      })
    })
  })
  app.get('/post/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'nombre direccion telefono', function (error, post) {
      if (error) { console.error(error); }
      res.send(post)
    })
  })
  
app.listen(process.env.PORT || 8081)
