import { ReviewItem } from "./SingleRepository";
// import useLoggedUser from "../hooks/useLoggedUser";
import { Text, FlatList, View } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import { GET_LOGGED_IN_USER_INFO } from "../graphql/queries";
import { useQuery } from "@apollo/client";
const UserReviews = () => {
  const { loading, data,refetch } = useQuery(GET_LOGGED_IN_USER_INFO, {
    variables: {
      includeReviews: true,
    },
    fetchPolicy: "cache-and-network",
  });
  
  if (loading) {
    return <Text>Loading...</Text>;
  }
  console.log("log me", data.me);
  if (!data.me) {
    // Handle the case where the user is not logged in
    return (
      <View style={{ padding: 20 }}>
        <Text>You are not logged in. Please sign in to view your reviews.</Text>
      </View>
    );
  }
  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  console.log("log review cua user", reviewNodes);

  if (reviewNodes.length === 0) {
    return (
      <View style={{ padding: 20,backgroundColor: "white" }}>
        <Text>You haven&apos;t made any reviews yet!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} showBtn={true} refetch={refetch}/>}
      keyExtractor={(item) => item.id}
    />
  );
};
export default UserReviews;
