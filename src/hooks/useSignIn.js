/* eslint-disable no-unused-vars */
import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/queries";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

//lưu token vào AuthStorage
// giữ nguyên return
// log in thành công thì navigate đến "/"
// sau khi authenticate đc thực thi và lưu token vào storage
// thì reset Apollo Client store với resetStore
// truy cập Apollo Client trong useSignIn dùng useApolloClient hook
// trình tự thực thi quan trọng
// const { data } = await mutate(/* options */);
// await authStorage.setAccessToken(/* access token from the data */);
// apolloClient.resetStore();
const useSignIn = () => {
  const authStorage = useAuthStorage(); // return useContext(Context_Provider)
  //nhận value được truyền từ Context.Provider là authStorage
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          username,
          password,
        },
      });

      console.log("mutation data: ", data);

      await authStorage.setAccessToken(data?.authenticate.accessToken);
      await apolloClient.resetStore();

      // const savedToken = authStorage.getAccessToken();
      // console.log(savedToken);

      return data?.authenticate;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
