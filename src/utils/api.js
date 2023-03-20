class Api {
    #baseUrl;
    #headers;

    constructor({ baseUrl, headers }) {
        thid.#baseUrl = baseUrl;
        this.#headers = headers;
    }

    #getResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
    }


}