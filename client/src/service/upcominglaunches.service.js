import { config } from '../config.js';
export default {
    /** Upcoming Launches Spacex */
    getLaunches: () => {
        return fetch(config.baseApiUrl+"upcoming")
            .then(res => res.json())
            .catch({ status: 500, message: 'Internal Server Error' });
    }
}