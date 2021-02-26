import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hpo.jax.org/api/hpo/disease/",
  withCredentials: false
});

export default {
  async getClinicalSynopsis(geneType, cardiomyopathyType) {
    if (
      geneType == "TNNT2" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let synopsisId = "OMIM:115195";
      let response = await apiClient.get(synopsisId);
      return response;
    }
    if (
      geneType == "MYH7" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let synopsisId = "OMIM:192600";
      let response = await apiClient.get(synopsisId);
      return response;
    }
    if (
      geneType == "MYBPC3" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let synopsisId = "OMIM:115197";
      let response = await apiClient.get(synopsisId);
      return response;
    }
    if (
      geneType == "TPM1" &&
      cardiomyopathyType == "Hypertrophic Cardiomyopathy"
    ) {
      let synopsisId = "OMIM:115196";
      let response = await apiClient.get(synopsisId);
      return response;
    }
  }
};
