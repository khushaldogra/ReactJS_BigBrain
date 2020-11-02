/**
 * Make a request to `path` with `options` and parse the response as JSON.
 * @param {*} path The url to make the reques to.
 * @param {*} options Additiona options to pass to fetch.
 */
const getJSON = (path, options) => {
    return new Promise((resolve, reject) => {
        fetch(path, options)
            .then(res => {
                if (res.status === 200) {
                    resolve(res.json());
                } 
                // other codes 404, etc *** - how to handle multiple responses
                // else if (res.status === 400) {

                // }
                else {
                    res.json().then(decodedData => {
                        //console.log('decodedData', decodedData);
                        reject(decodedData['message']);
                    }).catch(err => console.log('Hello?', err));
                }
            })
            // .catch(err => console.warn(`API_ERROR: ${err.message}`));
    });
}

/**
 * This is a sample class API which you may base your code on.
 * You may use this as a launch pad but do not have to.
 */
export default class API {
    /** @param {String} url */
    constructor(url) {
        this.url = url;
    } 

    // Options 
    // abstract within class itself - create get method

    /** @param {String} path */
    makeAPIRequest(path, options) {
        return getJSON(`${this.url}/${path}`, options);
    }

    post(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'POST',
        });
    }

    put(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'PUT',
        });
    }

    delete(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'DELETE',
        });
    }

    get(path, options) {
        return getJSON(`${this.url}/${path}`, {
            ...options,
            method: 'GET',
        });
    }
}
