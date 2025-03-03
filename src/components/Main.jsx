import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import theme from "../theme";
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
        <Route exact path="/" element={<RepositoryList />} />
        <Route path="/sign_in" element={<SignIn/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;

// import { Text, TextInput, Pressable, View } from "react-native";
// import { useFormik } from "formik";
// import * as yup from "yup";
// const initialValues = {
//   mass: "",
//   height: "",
// };

// const getBodyMassIndex = (mass, height) => {
//   return Math.round(mass / Math.pow(height, 2));
// };

// const validationSchema = yup.object().shape({
//   mass: yup
//     .number()
//     .min(1, "Weight must be greater or equal to 1")
//     .required("Weight is required"),
//   height: yup
//     .number()
//     .min(0.5, "Height must be greater or equal to 0.5")
//     .required("Height is required"),
// });

// const BodyMassIndexForm = ({ onSubmit }) => {
//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <View style={{ marginTop: 100 }}>
//       <TextInput
//         placeholder="Weight (kg)"
//         value={formik.values.mass}
//         onChangeText={formik.handleChange("mass")}
//       />
//       {formik.touched.mass && formik.errors.mass && (
//         <Text style={{ color: "red" }}>{formik.errors.mass}</Text>
//       )}
//       <TextInput
//         placeholder="Height (m)"
//         value={formik.values.height}
//         onChangeText={formik.handleChange("height")}
//       />
//       {formik.touched.height && formik.errors.height && (
//         <Text style={{ color: "red" }}>{formik.errors.height}</Text>
//       )}
//       <Pressable onPress={formik.handleSubmit}>
//         <Text>Calculate</Text>
//       </Pressable>
//     </View>
//   );
// };

// const BodyMassIndexCalculator = () => {
//   const onSubmit = (values) => {
//     const mass = parseFloat(values.mass);
//     const height = parseFloat(values.height);

//     if (!isNaN(mass) && !isNaN(height) && height !== 0) {
//       console.log(`Your body mass index is: ${getBodyMassIndex(mass, height)}`);
//     }
//   };

//   return <BodyMassIndexForm onSubmit={onSubmit} />;
// };

// export default BodyMassIndexCalculator;
