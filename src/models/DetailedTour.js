const mongoose = require('mongoose');

const DetailedTourSchema = new mongoose.Schema({
    titleText: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    destinations: {
        type: String,
        required: true
    },
    nights: {
        type: Number,
    },
    days: {
        type: Number,
    },
    titleLink: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true,
        default: "https://images.unsplash.com/photo-1626606076701-cf4ae64b2b03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    },
    itinerary: {
        type: String,
    },
    themes:{
        type: String,
    }


});

mongoose.models = {};
export default mongoose.model('DetailedTour', DetailedTourSchema);