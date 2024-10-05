import axios from "axios";

const BASE_URL = `https://jobs-apis.onrender.com/api/v1`;

// Create axio instance
const axiosInstance = axios.create({ baseURL: BASE_URL });

// Fetching jobs all at once
export const getJobsId = async () => {
  const data = (
    await axiosInstance.get("jobs", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg3ZjhkY2E2MjEzYjMwNzg2OGJmMDciLCJuYW1lIjoiT2xhd2FsZSIsImlhdCI6MTcyODEyNDQ4NCwiZXhwIjoxNzMwNzE2NDg0fQ.nvoUlBq6mKxTjmoOles7n2j6xIJ72xcHSL5PgPfbCDA`,
      },
    })
  ).data.jobs;

  // console.log(data);
  return data;
};

// Fetching jobs one by one
export const getJobs = async (id: string) => {
  const data = (
    await axiosInstance.get(`jobs/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg3ZjhkY2E2MjEzYjMwNzg2OGJmMDciLCJuYW1lIjoiT2xhd2FsZSIsImlhdCI6MTcyODEyNDQ4NCwiZXhwIjoxNzMwNzE2NDg0fQ.nvoUlBq6mKxTjmoOles7n2j6xIJ72xcHSL5PgPfbCDA`,
      },
    })
  ).data;
  // console.log(data);
  return data;
};

// Create a job
export const createJob = async (reqBody: Object) => {
  const data = await axiosInstance.post("jobs", reqBody, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg3ZjhkY2E2MjEzYjMwNzg2OGJmMDciLCJuYW1lIjoiT2xhd2FsZSIsImlhdCI6MTcyODEyNDQ4NCwiZXhwIjoxNzMwNzE2NDg0fQ.nvoUlBq6mKxTjmoOles7n2j6xIJ72xcHSL5PgPfbCDA`,
    },
  });
  console.log(data);
  return data;
};
