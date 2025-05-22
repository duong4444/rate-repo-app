import { CREATE_USER } from "../graphql/queries";
import { useMutation } from "@apollo/client";
// mutation CreateUser($user: CreateUserInput) {
//     createUser(user: $user) {
//       id
//       createdAt
//       username
//     }
//   }

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const SignUp = async (username, pwd) => {
    try {
      const { data } = await mutate({
        variables: {
          user: {
            username: username,
            password: pwd,
          },
        },
      });
      console.log("returned data create user ", data);

      return data.createUser;
    } catch (error) {
      console.error("log in hook Create user err", error);
      throw error;
    }

  };

  return [SignUp, result];

};
export default useSignUp;
