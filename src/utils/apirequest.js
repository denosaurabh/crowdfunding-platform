import axios from "axios";

import store from "../redux/store";

import { setCurrentError } from "../redux/errorReducer/error.actions";

class APIRequest {
  constructor(method, endpoint, data, token) {
    this.method = method;
    this.endpoint = endpoint;
    this.data = data;
    this.token = token;
  }

  request() {
    this.token = localStorage.getItem("USER_TOKEN");

    const resData = axios({
      method: this.method,
      url: `${process.env.REACT_APP_API_URL}/v1/api/${this.endpoint}`,
      data: this.data,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        // Dispatching the Error
        store.dispatch(setCurrentError(res.data));

        return res;
      })
      .catch((error) => {
        // Dispatching the Error
        store.dispatch(setCurrentError(error.response.data));
      });

    return resData;
  }
}

export default APIRequest;
