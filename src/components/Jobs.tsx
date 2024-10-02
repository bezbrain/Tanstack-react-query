import { useJobsIds } from "../services/queries";

const Jobs = () => {
  const jobsIdQuery = useJobsIds();

  if (jobsIdQuery.isPending) {
    return <span>Loading...</span>;
  }

  if (jobsIdQuery.isError) {
    return <span>An error occurred</span>;
  }

  return (
    <div>
      {jobsIdQuery.data.map((each: any) => (
        <p key={each._id}>{each._id}</p>
      ))}
    </div>
  );
};

export default Jobs;
