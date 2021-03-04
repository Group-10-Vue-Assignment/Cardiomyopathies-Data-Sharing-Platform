import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.news-medical.net%2Ftag%2Ffeed%2FCardiomyopathy.aspx",
  withCredentials: false
});

export default {
  async getNewsFeed() {
    let response = await apiClient.get();
    return response;
  }
};
