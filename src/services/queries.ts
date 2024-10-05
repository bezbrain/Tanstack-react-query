// THE QUERY CONFIGURATION HERE
// THE QUERY CONFIGURATION HERE

import { useQueries, useQuery } from "@tanstack/react-query";
import { getJobs, getJobsId } from "./api";

// This file is a tanstack configuration to handle validating, caching, error, loading etc

// useQuery is used when you need to fetch a single piece of data (or a single request). It's perfect for fetching one API or a single resource at a time. E.g fetch a list of jobs
export function useJobsIds() {
  return useQuery({
    queryKey: ["jobs"], // We can have anything as the query key. It just has to be unique across all keys. The key is used to revalidate the query
    queryFn: getJobsId, // The query function must always return a promise
    refetchOnWindowFocus: false, // This stops a refresh of the api call if user loses focus from your browser
    // enabled: true, // This is used for enabling or disabling this query
  });
}

// The useQueries method is used when you want to fetch multiple queries but do not how many of them are. E.g etching details for multiple job IDs at once
export function useJobs(ids: string[]) {
  return useQueries({
    queries: (ids ?? []).map((each) => {
      return {
        queryKey: ["job", each],
        queryFn: () => getJobs(each!),
      };
    }),
  });
}
