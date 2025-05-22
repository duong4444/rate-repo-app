/* eslint-disable no-unused-vars */
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import useCreateReview from "../hooks/useCreateReview";

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 14,
  },
  textInput: {
    height: 50,
    margin: 15,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  textInputErr: {
    borderColor: "red",
    marginBottom: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
    margin: 10,
  },
  errText: {
    marginLeft: 20,
    marginTop: 0,
    fontSize: 15,
    color: "red",
  },
});

const initialValues = {
  repository_owner_name: "",
  repository_name: "",
  rating: "",
  review: "",
};

const validationSchema = yup.object().shape({
  repository_owner_name: yup
    .string()
    .required("Repository owner name is required"),
  repository_name: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .required("Rating is required")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100"),
  review: yup.string().optional(),
});

export const CreateReviewForm = ({ onSubmit }) => {
  const [reviewInputHeight, setReviewInputHeight] = useState();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.repository_owner_name &&
              formik.errors.repository_owner_name &&
              styles.textInputErr,
          ]}
          placeholder="Repository owner name"
          value={formik.values.repository_owner_name}
          onChangeText={formik.handleChange("repository_owner_name")}
        />
        {formik.touched.repository_owner_name &&
          formik.errors.repository_owner_name && (
            <Text style={styles.errText}>
              {formik.errors.repository_owner_name}
            </Text>
          )}
        <TextInput
          style={[
            styles.textInput,
            formik.touched.repository_name &&
              formik.errors.repository_name &&
              styles.textInputErr,
          ]}
          placeholder="Repository name"
          value={formik.values.repository_name}
          onChangeText={formik.handleChange("repository_name")}
        />
        {formik.touched.repository_name && formik.errors.repository_name && (
          <Text style={styles.errText}>{formik.errors.repository_name}</Text>
        )}
        <TextInput
          style={[
            styles.textInput,
            formik.touched.rating &&
              formik.errors.rating &&
              styles.textInputErr,
          ]}
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange("rating")}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={styles.errText}>{formik.errors.rating}</Text>
        )}
        <TextInput
          style={[
            styles.textInput,
            { height: reviewInputHeight },
            formik.touched.review &&
              formik.errors.review &&
              styles.textInputErr,
          ]}
          multiline
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange("review")}
          onContentSizeChange={(e) =>
            setReviewInputHeight(e.nativeEvent.contentSize.height)
          }
        />
        {formik.touched.review && formik.errors.review && (
          <Text style={styles.errText}>{formik.errors.review}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            style={{ color: "white" }}
          >
            Create a review
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  const [err, setErr] = useState();

  const onSubmit = async (values) => {
    // const { repository_owner_name, repository_name, rating, review } = values;
    console.log(values);

    try {
      const result = await createReview(
        values.repository_owner_name,values.repository_name,Number(values.rating),values.review
      );
      if (result) {
        console.log("create a review successful", result.id);
        navigate(`/${result.repositoryId}`);
      } else {
        setErr("Create a review failed");
        setTimeout(() => {
          setErr(null);
        }, 7000);
      }
    } catch (error) {
      setErr(`Create a review failed: ${error.message}`);
      setTimeout(() => {
        setErr(null);
      }, 7000);
      console.error("log in cpn,Create a review error: ", error);
    }
  };

  return (
    <View>
      {err && <Text style={{ color: "red", margin: 10 }}>{err}</Text>}
      <CreateReviewForm onSubmit={onSubmit} />
    </View>
  );
};
