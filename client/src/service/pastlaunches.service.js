import { config } from '../config.js';
export default {
    /** Past Launches Spacex */
    getPastLaunches: () => {
        return fetch(config.baseApiUrl + "past")
            .then(res => res.json())
            .catch({ status: 500, message: 'Internal Server Error' });
    }
}