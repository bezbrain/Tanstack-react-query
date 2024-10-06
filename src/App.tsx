// import { useEffect, useState } from "react";
import CreateJob from "./components/createJob";
import Jobs from "./components/Jobs";

function App() {
  // const [jobs, setJobs] = useState([]);

  return (
    <>
      <Jobs />
      <CreateJob />
    </>
  );
}

export default App;
