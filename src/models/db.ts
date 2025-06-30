import 'dotenv/config';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://harshadmin:harshadmin32044@yournexttrip-cluster.cyhzaio.mongodb.net/yournexttripmain")

const CitySchema = new Schema({
    cityId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    cityName: {
        type: String,
        required: true
    }
})

const TourSchema = new Schema({
    tour_id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    city_id: {
        type: String,
        required: true,
        ref: 'City'
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    time: {
        type: Date
    },
    tags: {
        type: [String]
    },
    highlights: {
        type: [String]
    },
    overview: {
        type: String
    },
    itinerary: {
        type: [String]
    },
    package_inclusions: {
        type: [String]
    },
    package_exclusions: {
        type: [String]
    },
    add_ons: {
        type: [String]
    },
    information: {
        type: [String]
    },
    rating: {
        type: Number
    },
    maxGroupSize: {
        type: Number
    }
});


const city = mongoose.model('City', CitySchema);
const tour = mongoose.model('Tour', TourSchema);

export { city, tour };