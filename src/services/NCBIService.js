import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://eutils.ncbi.nlm.nih.gov/entrez/eutils",
  withCredentials: false
});

export default {
  async getGeneInformation(name) {
    if (name == "TNNT2") {
      let TNNT2Id = 7139;
      let response = await apiClient.get(
        "/esummary.fcgi?db=gene&format=json&id=" + TNNT2Id
      );
      return response.data.result[TNNT2Id];
    }
    if (name == "MYH7") {
      let MYH7Id = 4625;
      let response = await apiClient.get(
        "/esummary.fcgi?db=gene&format=json&id=" + MYH7Id
      );
      return response.data.result[MYH7Id];
    }
    if (name == "MYBPC3") {
      let MYBPC3Id = 4607;
      let response = await apiClient.get(
        "/esummary.fcgi?db=gene&format=json&id=" + MYBPC3Id
      );
      return response.data.result[MYBPC3Id];
    }
    if (name == "TPM1") {
      let TPM1Id = 7168;
      let response = await apiClient.get(
        "/esummary.fcgi?db=gene&format=json&id=" + TPM1Id
      );
      return response.data.result[TPM1Id];
    }
  }
};
