import axios from "axios";

const BASE_URL = `https://jobtrackier.onrender.com/api/v1`;

// Create axio instance
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getJobsId = async () => {
  const data = (await axiosInstance.get("postJob")).data.data.postJobsList;

  console.log(data);
  return data;
};
