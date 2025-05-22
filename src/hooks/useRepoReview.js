import { GET_DETAIL_REPO_REVIEWS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
const useRepoReview = (variables) => {
  const { loading, data, fetchMore, ...result } = useQuery(
    GET_DETAIL_REPO_REVIEWS,
    {
      // variables: {
      //   repositoryId: id,
      // },
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    console.log("can_fetch hook repoReview", canFetchMore);

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    reviews: data ? data.repository.reviews : undefined,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};
export default useRepoReview;
