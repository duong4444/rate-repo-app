import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import Constants from "expo-constants";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";
// khởi tạo authStorage
const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);
const App = () => {
  console.log(Constants.expoConfig.extra.env);
  console.log(Constants.expoConfig.extra.apollo_uri);

  return (
    <>
      <NativeRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
