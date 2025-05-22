import { GET_LOGGED_IN_USER_INFO } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useLoggedUser = (includeReviews) => {
  const { loading, data,refetch } = useQuery(GET_LOGGED_IN_USER_INFO, {
    variables: {
      includeReviews: includeReviews,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    me: data ? data.me : undefined,
    loading,refetch
  };
};
export default useLoggedUser;
