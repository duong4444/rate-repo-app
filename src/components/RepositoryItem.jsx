/* eslint-disable no-unused-vars */
import {
  Image,
  StyleSheet,
  View,
  Button,
  Alert,
} from "react-native";
import * as Linking from "expo-linking";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
  container_row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 10,
    // backgroundColor: "green",
  },
  container_column: {
    flex: 1, // fill nốt phần trống của cpn cha
    flexDirection: "column",
    padding: 10,
    // backgroundColor: "yellow",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "pink", // xanh dương nhạt
  },
  container_detail: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 14,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: "white",
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  stats: {
    alignItems: "center",
    margin: 5,
    // backgroundColor: "purple",
  },
});

const DisplayAnImage = ({ url_avatar }) => (
  <View>
    <Image
      style={styles.logo}
      source={{
        uri: url_avatar,
      }}
    />
  </View>
);

const formatDisplayedNumber = (number) => {
  if (number >= 1000) {
    const inputNumber = number / 1000;
    return Math.round(inputNumber * 10) / 10 + "k";
  } else {
    return number;
  }
};
//tạo view hiển thị repo đơn chứa info giống reviewed repo+btn "Open in Github"
// query Repository($repositoryId: ID!) {
//   repository(id: $repositoryId) {
//     id
//     url
//     fullName
//   }
// }
// dùng expo linking để mở URL trong browser
// cụ thể Linking.openURL
// view cho repo đơn sẽ có route path riêng
// repo id trong route path như là path parameter, có thể access = useParams
// press vào repo trong reviewed repo sẽ navigate đến repo đơn
// bọc RepoItem bằng Pressable và dùng navigate để change route trong onPress

const RepoItem = ({ item, showDetail,github_url }) => {
  return (
    <View
      testID="repoItem"
      style={showDetail ? styles.container_detail : styles.container}
    >
      <View style={styles.container_row}>
        <DisplayAnImage url_avatar={item.ownerAvatarUrl} />
        <View style={styles.container_column}>
          <Text fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.container_row}>
        <View style={styles.stats}>
          <Text fontWeight="bold" fontSize="subheading">
            {formatDisplayedNumber(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold" fontSize="subheading">
            {formatDisplayedNumber(item.forksCount)}
          </Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold" fontSize="subheading">
            {formatDisplayedNumber(item.reviewCount)}
          </Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.stats}>
          <Text fontWeight="bold" fontSize="subheading">
            {formatDisplayedNumber(item.ratingAverage)}
          </Text>
          <Text>Rating</Text>
        </View>
      </View>
      {showDetail && (
        <View>
          <Button
            title="Open in Github"
            onPress={() => Linking.openURL(`${github_url}`)}
          />
        </View>
      )}
    </View>
  );
};

export default RepoItem;
