import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";

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

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={() => console.log("haha")}>
          <Link to="/">
            <Text style={[styles.tabTitle, { marginLeft: 4 }]}>
              Repositories{" "}
            </Text>
          </Link>
        </Pressable>
        <Pressable onPress={() => console.log("sign in")}>
          <Link to="/sign_in">
            <Text style={styles.tabTitle}>Sign in</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
