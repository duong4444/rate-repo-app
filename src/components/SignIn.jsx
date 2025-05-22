import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from "formik";
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import { useState } from "react";
// import { useState } from "react";
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 20,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 14
  },
  textInput: {
    height: 50,
    margin: 15,
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10
  },
  textInputErr: {
    borderColor: "red",
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

// tạo form creating Review dùng formik
// phần TẠO FORM CÓ DÙNG YUP
// có 4 field là
// tên chủ repo github vd: jaredpalmer is a required string
// tên repo vd: formik is required ...
// số rating required number between 0 và 100
// review text là optional
// validate các field bằng yup schema
// dùng error messages cùng validators phù hợp
// validation message có thể đc định nghĩa là
// tham số message của validator message

// làm cho review field expand thành nhiều dòng bằng cách
// dùng prop multiline của <TextInput>

// tạo review bằng createReview mutation , dùng hook useMutation
// sau khi mutation createReview thành công thì redirect về SingleRepository (dùng navigate)
// kết quả trả về từ mutation có repoId để navigate về "/repoId"

//  The created review has a repositoryId field which you can use to construct the route's path.
// chỉ có repo public mới có thể review đc
// và user chỉ có thể review same repo 1 lần , ko cần handle err cho case này
// truy cập review form từ app bar label "Create a review"
// tab này chỉ xuất hiện cho user đã đăng nhập
// define route cho Review form

// tạo ra review ở repo nào thì cái review đc tạo sẽ có 
// repo id của repo được review

export const SignInForm = ({ onSubmit }) => {
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
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.textInput,
          formik.touched.password &&
            formik.errors.password &&
            styles.textInputErr,
        ]}
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
  const navigate = useNavigate();
  const [signIn,] = useSignIn();
  const [error,setError] = useState();
  const onSubmit = async (values) => {
    console.log("chú ý ở đây !!!!!!: ",values);
    // {"password": "password", "username": "kalle"}
    const { username, password } = values;
    try {
      const result = await signIn({ username, password });
      if (result) {
        console.log('Login successful:', result.user.username);
        console.log('Access token:', result.accessToken);
        navigate('/');
      } else {
        setError('Login failed: Invalid response from server');
        setTimeout(() => {
          setError(null)
        }, 2000);
      }
    } catch (e) {
      setError(`Authentication failed: ${e.message}`);
      setTimeout(() => {
        setError(null);
      }, 2000);
      console.error('Login error:', e);
    }
  };

  return (
    <View>
      {error && <Text style={{color: "red", margin: 10}}>{error}</Text>}
      <SignInForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
