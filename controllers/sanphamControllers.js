const express = require('express');
const { accessSync } = require('fs');
const { default: mongoose } = require('mongoose');
const { send } = require('process');
const SanPhamModel = require('../SanPhamModel');
const { log } = require('console');
const app = express()

app.get('/', (req, res) => {
  // await mongoose.connect(uri);
  console.log('Kết nối thành công');
  SanPhamModel.find({}).then(sanphams => {
    res.render('../views/sanphams.hbs', {
      sanphams: sanphams.map(sanpham => sanpham.toJSON())
    })
  })
});

app.get('/addsp', (req, res) => {
  res.render('addsp.hbs');
})

app.get('/updatesp/:id', async (req, res) => {
  let sp = await SanPhamModel.findOne( { _id: req.params.id} )

  res.render('updatesp.hbs', {
    id: req.params.id,
    ten: sp.ten,
    giatien: sp.giatien,
    soluong: sp.soluong
  })

  // res.render('updatesp.hbs')

})

app.post('/update', async (req, res) =>{
  var id = req.body.id;
  var ten = req.body.ten;
  var giatien = req.body.giatien;
  var soluong = req.body.soluong;

  try {
    await SanPhamModel.findOneAndUpdate( { _id: id}, {
      ten: ten,
      giatien: giatien,
      soluong: soluong
    } );

    res.redirect('/sanpham')
  } catch (error) {
    res.send('Error')
  }

  res.render('updatesp.hbs')
})

app.post('/themsanpham', async (req, res) => {
  const sanpham = new SanPhamModel({
    ten: req.body.ten,
    giatien: req.body.giatien,
    soluong: req.body.soluong,
  });

  sanpham.save().then(result =>{
    console.log('Thêm thành công');
    console.log(sanpham);
    SanPhamModel.find({}).then(sanphams => {
      res.render('sanphams.hbs', {
        sanphams: sanphams.map(sanpham => sanpham.toJSON())
      })
    })
  })
  .catch(err =>{
    console.error('Lỗi', err);
  })
    
});

app.post('/delete/:id', async function(req, res) {
  let sp = await SanPhamModel.findByIdAndDelete(req.params.id);

  res.redirect('/sanpham/')

});

// app.get('/updatesp', async (req, res) => {
//     let sanpham = await SanPhamModel.findById(req.params.id);
//     res.render('sanpham/updatesp', {
//         sanpham: sanpham.toJSON()
//     })  

//     // new mongoose.ObjectId()


// })


module.exports = app;

