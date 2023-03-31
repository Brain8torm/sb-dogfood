class Api {
  #baseUrl;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  #onResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  #getApiUrl(path) {
    return `${this.#baseUrl}${path}`;
  }

  getUserInfo() {
    return fetch(this.#getApiUrl('/users/me'), {
      headers: this.#headers,
    }).then(this.#onResponse);
  }

  getProductsList() {
    return fetch(this.#getApiUrl('/products'), {
      headers: this.#headers,
    }).then(this.#onResponse);
  }

  getAllInfo() {
    return Promise.all([this.getProductsList(), this.getUserInfo()]);
  }

  search(searchQuery) {
    return fetch(this.#getApiUrl(`/products/search?query=${searchQuery}`), {
      headers: this.#headers,
    }).then(this.#onResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this.#getApiUrl('/users/me'), {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({ name, about }),
    }).then(this.#onResponse);
  }

  changeLikeProductStatus(productID, like) {
    return fetch(this.#getApiUrl(`/products/likes/${productID}`), {
      method: like ? 'DELETE' : 'PUT',
      headers: this.#headers,
    }).then(this.#onResponse);
  }

  getProductById(idProduct) {
    return fetch(this.#getApiUrl(`/products/${idProduct}`), {
      headers: this.#headers
    }).then(this.#onResponse);
  }

  getInfoProduct(idProduct) {
    return Promise.all([this.getProductById(idProduct), this.getUserInfo()]);
  }
}

const api = new Api({
  baseUrl: 'https://api.react-learning.ru',
  headers: {
    'content-type': 'application/json',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOGFhMzk3MTIxODM4ZjI4ZGEiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ2LCJleHAiOjE3MTAzMzg0NDZ9.NuCTE98G8Un3lOPytdymhzHM-BGkhlHGruCeCjFNK0c',
  },
});

export default api;
