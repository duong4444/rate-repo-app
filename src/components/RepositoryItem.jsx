import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
const styles = StyleSheet.create({
  container_row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 10,
    backgroundColor: "green",
  },
  container_column: {
    flex: 1, // fill nốt phần trống của cpn cha
    flexDirection: "column",
    padding: 10,
    backgroundColor: "yellow",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#64a4d3",
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
    backgroundColor: "purple",
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
    return Math.round(inputNumber * 10) / 10 + "k"
  } else {
    return number;
  }
};

const RepoItem = ({ item }) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default RepoItem;
