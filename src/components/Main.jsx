/* eslint-disable no-unused-vars */
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import theme from "../theme";
import SingleRepository from "./SingleRepository";
import { CreateReview } from "./CreateReviewForm";
import UserReviews from "./UserReviews";
import { SignUp } from "./SignUp";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/review_form" element={<CreateReview />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/my_review" element={<UserReviews />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </View>
  );
};

export default Main;
