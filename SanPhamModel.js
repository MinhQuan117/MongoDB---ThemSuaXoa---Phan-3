const mongoose = require('mongoose');

const SanPhamSchema = new mongoose.Schema({
    ten: {
        type: String,
    },

    giatien: {
        type: Number,
    },

    soluong: {
        type: Number,
    },

});

const SanPhamModel = new mongoose.model('Sanpham', SanPhamSchema);

module.exports = SanPhamModel;
