import axios from "axios";

// Expires August 2021
let apiKey = "tNhHB-RqSsSFIdWm5DPUOA";

const apiClient = axios.create({
  baseURL: "https://api.omim.org/api",
  withCredentials: false
});

export default {
  async getPhenotypes(geneType, cardiomyopathyType) {
    if (
      geneType == "TNNT2" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let phenotypeMIMNumber = "115195";
      let response = await apiClient.get(
        "/entry?include=geneMap&format=json&mimNumber=" +
          phenotypeMIMNumber +
          "&apiKey=" +
          apiKey
      );
      return response;
    }
    if (
      geneType == "MYH7" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let phenotypeMIMNumber = "192600";
      let response = await apiClient.get(
        "/entry?include=geneMap&format=json&mimNumber=" +
          phenotypeMIMNumber +
          "&apiKey=" +
          apiKey
      );
      return response;
    }
    if (
      geneType == "MYBPC3" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let phenotypeMIMNumber = "115197";
      let response = await apiClient.get(
        "/entry?include=geneMap&format=json&mimNumber=" +
          phenotypeMIMNumber +
          "&apiKey=" +
          apiKey
      );
      return response;
    }
    if (
      geneType == "TPM1" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let phenotypeMIMNumber = "115196";
      let response = await apiClient.get(
        "/entry?include=geneMap&format=json&mimNumber=" +
          phenotypeMIMNumber +
          "&apiKey=" +
          apiKey
      );
      return response;
    }
  }
};
