var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
    logo: {
        img: {
            type: String,
        },
        path: {
            type: String,
        },
    },
    favicon: {
        img: {
            type: String,
        },
    },
    menuList: [
        {
            name: String,
            path: String,
        }
    ],
    button: {
        text: String,
        link: String
    }
});

module.exports = mongoose.model('menu', menuSchema);