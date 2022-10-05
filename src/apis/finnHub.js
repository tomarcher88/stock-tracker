import axios from "axios";

const TOKEN = "cculj0aad3i1tdr4plq0cculj0aad3i1tdr4plqg";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  },
})