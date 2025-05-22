/* eslint-disable no-unused-vars */
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 20,
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
    marginTop: 15,
    marginBottom: 20,
    margin: 10,
  },
  errText: {
    marginLeft: 20,
    marginTop: 0,
    fontSize: 15,
    color: "red",
  },
  toggleButton: {
    position:"absolute",
    right: 25,
    top: 30,

  },
});

const initialValues = {
  username: "",
  password: "",
  password_confirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("username is required")
    .min(5, "username length between 5 and 30")
    .max(30, "username length between 5 and 30"),
  password: yup
    .string()
    .required("password is required")
    .min(5, "password length between 5 and 30")
    .max(50, "password length between 5 and 30"),
  password_confirmation: yup
    .string()
    .required("password confirmation is required")
    .oneOf([yup.ref("password")], "password confirmation must match password"),
});

export const SignUpForm = ({ onSubmit }) => {
  const [showPwd, setShowPwd] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          formik.touched.username &&
            formik.errors.username &&
            styles.textInputErr,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errText}>{formik.errors.username}</Text>
      )}
      <View>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.password &&
              formik.errors.password &&
              styles.textInputErr,
          ]}
          placeholder="Password"
          secureTextEntry={!showPwd}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPwd(!showPwd)}
        >
          <Text>{showPwd ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errText}>{formik.errors.password}</Text>
      )}
      <View>
        <TextInput
          style={[
            styles.textInput,
            formik.touched.password_confirmation &&
              formik.errors.password_confirmation &&
              styles.textInputErr,
          ]}
          placeholder="Password confirmation"
          secureTextEntry={!showPasswordConfirmation}
          value={formik.values.password_confirmation}
          onChangeText={formik.handleChange("password_confirmation")}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
        >
          <Text>{showPasswordConfirmation ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {formik.touched.password_confirmation &&
        formik.errors.password_confirmation && (
          <Text style={styles.errText}>
            {formik.errors.password_confirmation}
          </Text>
        )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ color: "white" }}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [SignUp] = useSignUp();
  const [signIn] = useSignIn();
  const [err, setErr] = useState();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;
    try {
      const result = await SignUp(values.username, values.password);
      if (result) {
        console.log("Sign up successful", result.username);
        try {
          const result_sign_in = await signIn({ username, password });
          if (result_sign_in) {
            console.log("Login successful:", result_sign_in.user.username);
            console.log("Access token:", result_sign_in.accessToken);
            navigate("/");
          } else {
            setErr("Login failed: Invalid response from server");
            setTimeout(() => {
              setErr(null);
            }, 7000);
          }
        } catch (e) {
          setErr(`Authentication failed: ${e.message}`);
          setTimeout(() => {
            setErr(null);
          }, 7000);
          console.error("log in sign in after sign up ,Login error :", e);
        }
      }
    } catch (error) {
      // catch err in Sign Up
      setErr(`Create a user failed: ${error.message}`);
      setTimeout(() => {
        setErr(null);
      }, 7000);
      console.error("log in cpn Sign up, error: ", error);
    }
  };
  return (
    <View>
      {err && <Text style={{ color: "red", margin: 10 }}>{err}</Text>}
      <SignUpForm onSubmit={onSubmit} />
    </View>
  );
};

// sorting repo list theo
// latest repo (repo có review đầu tiên gần đây nhất), hiện tại , set là default
// highest rated repo , có rating cao nhất 
// lowest rated repo , có rating thấp nhất
// dùng "repositories" query , có arg là "orderBy"
// orderBy có 2 values khả dụng: 
// ngày của review đầu tiên của repo CREATED_AT
// rating , RATING_AVERAGE
// cx có arg là orderDirection : 2 allowed values 
// ASC smallest trc, DESC biggest trc
// lưu principle dùng useState 
// variables dùng trong "repositories" query có thể 
// đc truyền cho useRepositories như argument
// dùng cpn... để thực thi giao diện phần selection
// ListHeaderComponent để hiển thị dropdown

