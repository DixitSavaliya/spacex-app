const express = require('express');
const tweetsRoutes = express.Router();
const Twit = require('twit');
const tweetvalidation = require('../validation/tweetvalidation.js');
const ENV = require('dotenv');
ENV.config();

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

/** SpaceX Twitter-tweets */
tweetsRoutes.get('/twitter-tweets', tweetvalidation.tweets, (req, res) => {
    T.get('/statuses/user_timeline.json?screen_name=SpaceX&count=15', function (err, response) {
        if (err) {
            console.log('err: ', err);
        } else {
            res.status(200).send(response);
        }
    })
})

/** Elon Musk Twitter-tweets */
tweetsRoutes.get('/twitter-tweet', tweetvalidation.tweets, (req, res) => {
    T.get('/statuses/user_timeline.json?screen_name=ElonMusk&count=15', function (err, response) {
        if (err) {
            console.log('err: ', err);
        } else {
            res.status(200).send(response);
        }
    })
})


module.exports = tweetsRoutes;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  