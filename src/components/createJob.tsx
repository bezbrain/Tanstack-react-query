import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreateJob } from "../services/mutations";

const CreateJob = () => {
  const job = {
    company: "",
    position: "",
  };

  const [isJob, setIsJob] = useState(job);
  const [isMessage, setIsMessage] = useState<string>("");

  const { company, position } = isJob;

  const createJobMutation = useCreateJob();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsJob({
      ...isJob,
      [name]: value,
    });
  };

  // SUBMIT JOB FORM
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(isJob);
    // Pass the job to mutate
    createJobMutation.mutate(isJob);
  };

  useEffect(() => {
    if (createJobMutation.isPending) {
      setIsMessage("Loading...");
    } else if (createJobMutation.isSuccess) {
      setIsMessage(createJobMutation.data.data.message);
      setIsJob(job); // Reset field
    } else if (createJobMutation.isSuccess) {
      setIsMessage("An error occurred");
    }
  }, [
    createJobMutation.isPending,
    createJobMutation.isSuccess,
    createJobMutation.isSuccess,
  ]);

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="">Company: </label>
      <input
        type="text"
        name="company"
        value={company}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="">Position: </label>
      <input
        type="text"
        name="position"
        value={position}
        onChange={handleChange}
      />
      <br />
      <button type="submit">
        {createJobMutation.isPending ? "Loading" : "Submit"}
      </button>
      <p>Server Message: {isMessage}</p>
    </form>
  );
};

export default CreateJob;
