import { FlatList, View, StyleSheet, Pressable, Text } from "react-native";
import RepoItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import useSearchRepo from "../hooks/useSearchRepo";
import { useParams } from "react-router-native";
import { useNavigate } from "react-router-native";
import useDetailRepo from "../hooks/useDetailRepo";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    height: 50,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
  },
  searchBar: {
    margin: 15,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
  },
});

export const RepoItemDetail = () => {
  const { id } = useParams();

  const { repository, loading } = useDetailRepo(id);
  if (loading) {
    return <Text>Loading ...</Text>;
  }
  if (!repository) {
    return <Text>Repository not found!</Text>;
  }

  const item = {
    id: repository.id,
    fullName: repository.fullName,
    description: repository.description,
    language: repository.language,
    forksCount: repository.forksCount,
    stargazersCount: repository.stargazersCount,
    ratingAverage: repository.ratingAverage,
    reviewCount: repository.reviewCount,
    ownerAvatarUrl: repository.ownerAvatarUrl,
  };

  return <RepoItem item={item} showDetail={true} github_url={repository.url} />;
};

export const ItemSeparator = () => <View style={styles.separator} />;

export const SelectSortForRepo = ({ sortChoice, setSortChoice }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={sortChoice}
        onValueChange={(value) => setSortChoice(value)}
        style={styles.picker}
      >
        <Picker.Item
          label="Select an item..."
          enabled={false}
          style={{ color: "gray" }}
        />
        <Picker.Item label="Latest repositories" value="CREATED_AT_DESC" />
        <Picker.Item
          label="Highest rated repositories"
          value="RATING_AVERAGE_DESC"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="RATING_AVERAGE_ASC"
        />
      </Picker>
    </View>
  );
};

const getOrderByAndDirection = (sortChoice) => {
  switch (sortChoice) {
    case "CREATED_AT_DESC":
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    case "RATING_AVERAGE_DESC":
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    case "RATING_AVERAGE_ASC":
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    default:
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
  }
};

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const [sortChoice, setSortChoice] = useState("CREATED_AT_DESC");

  const { repositories_from_search } = useSearchRepo(debouncedSearchQuery);

  const { orderBy, orderDirection } = getOrderByAndDirection(sortChoice);

  const { repositories, fetchMore } = useRepositories({
    first: 4,
    orderBy,
    orderDirection,
  });

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const searchResults = repositories_from_search
    ? repositories_from_search.edges.map((edge) => edge.node)
    : [];

  const navigate = useNavigate();

  const displayData = debouncedSearchQuery ? searchResults : repositoryNodes;
  const onEndReach = () => {
    // if (
    //   !debouncedSearchQuery ||
    //   debouncedSearchQuery === "" ||
    //   debouncedSearchQuery === undefined
    // ) {
    //   fetchMore();
    //   console.log("you have reached the end of the list");
    // }
    if(debouncedSearchQuery){
      return;
    }else{
      fetchMore();
      console.log("you have reached the end of the list");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={displayData}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepoItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={{ flexDirection: "column" }}>
            <Searchbar
              placeholder="Search repository"
              onChangeText={(query) => {
                setSearchQuery(query);
                console.log("Search query: ", query);
              }}
              value={searchQuery}
              style={styles.searchBar}
            />
            {!debouncedSearchQuery && (
              <SelectSortForRepo
                sortChoice={sortChoice}
                setSortChoice={setSortChoice}
              />
            )}
          </View>
        }
      />
    </View>
  );
};

export default RepositoryList;
