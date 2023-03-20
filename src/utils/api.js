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

const api = new Api({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4ZGEiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ2LCJleHAiOjE3MTAzMzg0NDZ9.NuCTE98G8Un3lOPytdymhzHM-BGkhlHGruCeCjFNK0c'
    }
});

export default api;