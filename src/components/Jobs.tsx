import { useJobs, useJobsIds } from "../services/queries";
import { useIsFetching } from "@tanstack/react-query"; // This is used to help know if my data is fetching or not

const Jobs = () => {
  const jobsIdQuery = useJobsIds();
  const isFetching = useIsFetching();

  // Only call useJobs if jobsIdQuery is successful and data exists
  const jobIds = jobsIdQuery.data
    ? jobsIdQuery.data.map((each: { _id: string }) => each._id)
    : [];
  const jobsQueries = useJobs(jobIds); // Fetch multiple queries
  // console.log(jobsQueries);

  if (jobsIdQuery.isPending) {
    return <span>Loading...</span>;
  }

  if (jobsIdQuery.isError) {
    return <span>An error occurred</span>;
  }

  return (
    <section>
      <div>
        <p>Query function status: {jobsIdQuery.fetchStatus}</p>
        <p>Query status: {jobsIdQuery.status}</p>
        <p>Global fetching: {isFetching}</p>

        <h2>These are the ids</h2>
        {jobsIdQuery.data.map((each: any) => (
          <p key={each._id}>id: {each._id}</p>
        ))}
      </div>

      {/* Rendering job queries */}
      <div>
        {jobsQueries.map((each: any, index) => {
          if (each.isLoading) {
            return <li key={index}>Loading job details...</li>;
          }

          if (each.isError) {
            return <li key={index}>Error loading job details</li>;
          }

          return (
            <li key={each.data.data.postJob._id}>
              {each.data.data.postJob._id}
            </li>
          );
        })}
      </div>
    </section>
  );
};

export default Jobs;
