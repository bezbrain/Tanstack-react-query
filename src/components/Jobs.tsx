import { useState } from "react";
import { useDeleteJob } from "../services/mutations";
import { useJobs, useJobsIds } from "../services/queries";
import { useIsFetching } from "@tanstack/react-query"; // This is used to help know if my data is fetching or not

const Jobs = () => {
  const jobsIdQuery = useJobsIds();
  const isFetching = useIsFetching();

  const [jobId, setJobId] = useState("");

  // Only call useJobs if jobsIdQuery is successful and data exists
  const jobIds = jobsIdQuery.data
    ? jobsIdQuery.data.map((each: { _id: string }) => each._id)
    : [];
  const jobsQueries = useJobs(jobIds); // Fetch multiple queries
  // console.log(jobsQueries);

  // Delete job hook
  const deleteJobMutation = useDeleteJob(setJobId);

  // DELETE A JOB
  const handleClick = (id: string) => {
    // console.log(id);
    setJobId(id);
    deleteJobMutation.mutate(id);
  };

  if (jobsIdQuery.isPending) {
    return <span>Loading...</span>;
  }

  if (jobsIdQuery.isError) {
    return <span>An error occurred</span>;
  }

  return (
    <section style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <p>Query function status: {jobsIdQuery.fetchStatus}</p>
        <p>Query status: {jobsIdQuery.status}</p>
        <p>Global fetching: {isFetching}</p>

        <h2>Single Queries</h2>
        {jobsIdQuery.data.map((each: any) => (
          <div
            key={each._id}
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <p>id: {each._id}</p>
            <button onClick={() => handleClick(each._id)}>
              {deleteJobMutation.isPending && each._id === jobId
                ? "Loading"
                : "Delete"}
            </button>
          </div>
        ))}
      </div>

      {/* Rendering job queries */}
      <div>
        <h2>Multiple Queries</h2>
        <div>
          {jobsQueries.map((each: any, index) => {
            if (each.isLoading) {
              return <li key={index}>Loading job details...</li>;
            }

            if (each.isError) {
              return <li key={index}>Error loading job details</li>;
            }

            return (
              <li key={each.data.data.job._id}>
                <div>Id: {each.data.data.job._id}</div>
                <span>Company: {each.data.data.job.company}</span>
                <br />
                <span>Job Position: {each.data.data.job.position}</span>
              </li>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
