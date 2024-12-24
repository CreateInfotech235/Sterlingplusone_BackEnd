var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Allblog = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thought: {
        type: String,
        required: true,
    },
    subImage: {
        type: String,
        required: true,
    },
    subDescription: {
        type: String,
        required: true,
    },
    button: [
        {
            name: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
        },
    ],
    isShow: {
        type: Boolean,
        default: false,
    },
});

var AllblogSchema = new Schema({ Allblog });

module.exports = mongoose.model("Allblog", AllblogSchema);
