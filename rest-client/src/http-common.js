import axios from "axios";

const token = "62615f8bdefb9a9bb2b1bc2515c34d0669f6e8ec"

export default axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: {
    "Content-type": "application/json",
    "Authorization": 'Token ' + token
  }
});
