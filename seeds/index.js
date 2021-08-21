const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '611d7e96f74a6a2f2c0d4639',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dopkp880a/image/upload/v1629563788/YelpCamp/lc3tfi3tsbdnt8ajlmb4.jpg',
                    filename: 'YelpCamp/lc3tfi3tsbdnt8ajlmb4'
                },
                {
                    url: 'https://res.cloudinary.com/dopkp880a/image/upload/v1629563789/YelpCamp/nfvrbvxokf4w2i7yqsrx.jpg',
                    filename: 'YelpCamp/nfvrbvxokf4w2i7yqsrx'
                },
                {
                    url: 'https://res.cloudinary.com/dopkp880a/image/upload/v1629563792/YelpCamp/d7tyddavohadstoluqh0.jpg',
                    filename: 'YelpCamp/d7tyddavohadstoluqh0'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, ut earum quasi adipisci accusantium error a laudantium eveniet, repellendus labore dolorem debitis natus tempore, id laborum. Delectus, quis! Consequatur, architecto!',
            price

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})