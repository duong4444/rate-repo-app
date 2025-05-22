import { CREATE_REVIEW } from "../graphql/queries";
import { useMutation } from "@apollo/client";

// mutation CreateReview($review: CreateReviewInput) {
//     createReview(review: $review) {
//       repositoryId
//       text
//       rating
//       id
//       createdAt
//     }
//   }

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (
    repository_owner_name,
    repository_name,
    rating,
    review
  ) => {
    try {
      const { data } = await mutate({
        variables: {
          review: {
            ownerName: repository_owner_name,
            repositoryName: repository_name,
            rating: rating,
            text: review,
          },
        },
      });
      console.log("data trả về từ mutation createReview ", data);

      return data.createReview;
    } catch (error) {
      console.error("Create review error: ", error);
      throw error;
    }
  };
  return [createReview, result];
};

export default useCreateReview;
