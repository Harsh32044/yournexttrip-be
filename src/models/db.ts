import 'dotenv/config';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URL!, {
    tls: true,
    tlsInsecure: false,
    serverApi: {
        version: '1'}
})

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
    },

    subText: {
        type: String
    },

    shortDesc: {
        type: String
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

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        unique: true
    },

    type: {
        type: String,
        enum: ['user', 'admin', 'agent'],
        required: true,
        default: 'user'
    }

})

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      maxlength: 250,
    },
    content: {
      type: String,
      required: true, // full post (Markdown or HTML)
    },
    image: {
        type: String,
        required: false
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: { type: String, required: true },
      profileUrl: { type: String },
      avatarUrl: { type: String },
    },
    tags: {
      type: [String],
      default: [],
      index: true, // makes tag-based filtering fast
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    meta: {
      readingTime: { type: Number }, // minutes
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

blogSchema.set("toJSON", {
  virtuals: true,
  versionKey: false, // removes __v
  transform: function (doc, ret) {
    ret.id = ret._id;  // add id field
    delete ret._id;    // remove _id
  },
});

blogSchema.index({ title: "text", content: "text" });


const blog = mongoose.model("Blog", blogSchema);
const city = mongoose.model('City', CitySchema);
const tour = mongoose.model('Tour', TourSchema);
const user = mongoose.model('User', userSchema);

export { city, tour, blog, user };