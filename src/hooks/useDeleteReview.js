import { DELETE_REVIEW } from "../graphql/queries";
import { useMutation } from "@apollo/client";

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const delete_review = async (review_id) => {
    try {
      const { data } = await mutate({
        variables: {
          deleteReviewId: review_id,
        },
      });
      console.log("data delete review", data.deleteReview);
      return data.deleteReview;
    } catch (error) {
      console.error("delete review error:", error);
      throw error;
    }
  };
  return [delete_review, result];
};

export default useDeleteReview;
