const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.engine('hbs', expressHbs.engine({extname: "hbs", defaultLayout: null}));    
app.set('view engine', 'hbs');
app.set('views', './views');

const methodOverride = require('method-override');

app.use(methodOverride('_method'));

app.use(bodyParser.json())

var urlencodedParser = bodyParser.urlencoded({ extended: false});

const sanphamController = require('./controllers/sanphamControllers')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const SanPhamModel = require('./SanPhamModel')

const mongoose = require('mongoose');

const uri = 'mongodb+srv://MinhKuann:OUlaAza7DqSTq43v@cluster0.mdgs9of.mongodb.net/CP17305?retryWrites=true&w=majority';    

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, }); 

app.use('/sanpham', sanphamController);

app.listen(3000, () =>{
    console.log(`Khởi chạy app`);
} )