import { config } from '../config.js';

export default {

    /** Twitter Launches Spacex */
    getTwitterLaunches: () => {
        return fetch(config.baseConfig + "twitter-tweets")
            .then(res => res.json())
            .catch({ status: 500, message: 'Internal Server Error' });
    },

    /** Twitters Launches Spacex */
    getTwittersLaunches: () => {
        return fetch(config.baseConfig + "twitter-tweet")
            .then(res => res.json())
            .catch({ status: 500, message: 'Internal Server Error' });
    }
}