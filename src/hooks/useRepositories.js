/* eslint-disable no-unused-vars */
import { GET_REPOSITORIES } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useRepositories = (variables) => {
  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });
  // console.log("data tu useRepositories: ",data.repositories.edges);
  

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    console.log("CAN FETCH ", canFetchMore);
    
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
