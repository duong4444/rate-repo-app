/* eslint-disable no-unused-vars */
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link, useNavigate } from "react-router-native";
import { useEffect, useState } from "react";
import { GET_LOGGED_IN_USER_INFO } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundColor_AppBar,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tabTitle: {
    marginTop: 10,
    color: "#FFFFFF",
    padding: 17,
  },

  // ...
});
// khi sign in thành công thì btn sign in => sign out
// press sign out tab thì remove user's token và reset ApolloClient với resetStore
// gọi resetStore sẽ thực thi lại tất cả các query , tức là me cx đc re-executed
// remove token khởi storage trước khi resetStore
const AppBar = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data, loading } = useQuery(GET_LOGGED_IN_USER_INFO);
  const navigate = useNavigate();
  console.log("giá trị isLoggedIn: ", isLoggedIn);

  if (loading) {
    console.log("loading query check logged in user");
  }
  console.log("log in app bar ", data);

  useEffect(() => {
    if (data?.me) {
      setIsLoggedIn(true);
      console.log("neu co data trong useEffect");
    } else {
      setIsLoggedIn(false);
      console.log("neu khong co");
    }
  }, [data]);

  const handleLogPress = (route) => {
    console.log(`Navigating to ${route}`);
  };
  // fetch authenticated user bằng query me ,
  // "me" return User type chua
  //

  const handleSignOut = async () => {
    if (isLoggedIn) {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      setIsLoggedIn(false);
      navigate("/");

    }
  };
  // tạo form Sign up dùng formik
  // 3 field username , pwd , pwd confirmation
  // validate form dùng yup
  // username required length 5-30
  // pwd required length 5-30

  // pwd confirmation matches pwd
  // pwd confirmation can be done for example by
  // using the oneOf and ref methods like suggested in this issue.

  // create new user bằng mutation createUser
  // mutation thành công thì đăng nhập user vừa tạo bằng useSignIn
  // sau khi user đc sign in chuyển hướng về "/"
  // tạo Sign up tab , hiển thị khi chưa có user sign in
  // isLoggedIn === false thì repo | sign in | sign up
  // isLoggedIn === true thì repo | create a review | sign out
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Link to="/" onPress={() => handleLogPress("repositories")}>
          <Text style={styles.tabTitle}>Repositories</Text>
        </Link>
        {isLoggedIn ? (
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={() => navigate("/review_form")}>
              <Text style={styles.tabTitle}>Create a review</Text>
            </Pressable>
            <Pressable onPress={() => navigate("/my_review")}>
              <Text style={styles.tabTitle}>My reviews</Text>
            </Pressable>
            <Pressable onPress={() => handleSignOut()}>
              <Text style={styles.tabTitle}>Sign out</Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={() => navigate("/sign_in")}>
              <Text style={styles.tabTitle}>Sign in</Text>
            </Pressable>
            <Pressable onPress={() => navigate("/sign_up")}>
              <Text style={styles.tabTitle}>Sign up</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
