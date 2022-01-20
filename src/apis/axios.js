import axios from "axios";

const DOMAIN_URL = "/";

const instance = axios.create({
  baseURL: DOMAIN_URL,
  timeout: 30000,
});

export default instance;
