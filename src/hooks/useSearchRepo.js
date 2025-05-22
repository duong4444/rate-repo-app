/* eslint-disable no-unused-vars */
import { GET_REPOSITORIES_FOR_SEARCH} from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useSearchRepo = (searchKeyword) => {
  const { loading, data } = useQuery(GET_REPOSITORIES_FOR_SEARCH, {
    variables: {
        searchKeyword: searchKeyword
    },
    fetchPolicy: "cache-and-network",
  });
  return {
    repositories_from_search: data ? data.repositories : undefined,
    loading,
  };
};

export default useSearchRepo;
