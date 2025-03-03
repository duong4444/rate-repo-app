import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
// import { useState } from "react";
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 20,
    flexDirection: "column",
    backgroundColor: "white",
  },
  textInput: {
    height: 50,
    margin: 15,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  textInputErr: {
    borderColor: "red"
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
    margin: 10,
  },
});
const initialValues = {
  username: "",
  password: "",
};

// ko gọi onSubmit nếu validation fail
// đã chạm && có error thì hiển thị error text đỏ
// và set border của input field bị error là đỏ
// set error props của TextInput = true , dùng để style theo điều kiện
const validationSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().required("password is required"),
});

const SignInForm = ({ onSubmit }) => {
  // formik là obj
  // formik.values chứa current value của form field
  // formik.handleChange update form state khi user type vào input field
  // formik.handleSubmit = onSubmit đc truyền vào
  // const [err, setErr] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.textInput,formik.touched.username && formik.errors.username && styles.textInputErr]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.textInput,formik.touched.password && formik.errors.password && styles.textInputErr]}
        placeholder="Password"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          style={{ color: "white" }}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};
const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;
    console.log(username, password);
  };

  return (
    <View>
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
