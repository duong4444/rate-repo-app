import { GET_SINGLE_REPO } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useDetailRepo = (id) => {
  const { loading, data } = useQuery(GET_SINGLE_REPO, {
    variables: {
      repositoryId: id,
    },
  });


  return {
    repository: data ? data.repository : undefined,
    loading
  }
};

export default useDetailRepo;
