/* eslint-disable no-unused-vars */
import useRepositories from "../hooks/useRepositories";
import RepoItem from "../components/RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import {
  render,
  fireEvent,
  screen,
  within,
} from "@testing-library/react-native";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;
const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepoItem item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
    />
  );
};
// viết test check RepositoryListContainer có render ra repo name,
//description, language, forks count, stargazers count, rating average,
//  and review count correctly.
const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      // Add your test code here
      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId("repoItem");
      const firstRepositoryItem = within(repositoryItems[0]);
      const secondRepositoryItem = within(repositoryItems[1]);

      // Kiểm tra repository đầu tiên
      expect(firstRepositoryItem.getByText("jaredpalmer/formik")).toBeTruthy();
      expect(
        firstRepositoryItem.getByText("Build forms in React, without the tears")
      ).toBeTruthy();
      expect(firstRepositoryItem.getByText("TypeScript")).toBeTruthy();
      expect(firstRepositoryItem.getByText("21.9k")).toBeTruthy();
      expect(firstRepositoryItem.getByText("Stars")).toBeTruthy();
      expect(firstRepositoryItem.getByText("1.6k")).toBeTruthy();
      expect(firstRepositoryItem.getByText("Forks")).toBeTruthy();
      expect(firstRepositoryItem.getByText("3")).toBeTruthy();
      expect(firstRepositoryItem.getByText("Reviews")).toBeTruthy();
      expect(firstRepositoryItem.getByText("88")).toBeTruthy();
      expect(firstRepositoryItem.getByText("Rating")).toBeTruthy();

      // Kiểm tra repository thứ hai
      expect(
        secondRepositoryItem.getByText("async-library/react-async")
      ).toBeTruthy();
      expect(
        secondRepositoryItem.getByText(
          "Flexible promise-based React data loader"
        )
      ).toBeTruthy();
      expect(secondRepositoryItem.getByText("JavaScript")).toBeTruthy();
      expect(secondRepositoryItem.getByText("1.8k")).toBeTruthy();
      expect(secondRepositoryItem.getByText("Stars")).toBeTruthy();
      expect(secondRepositoryItem.getByText("69")).toBeTruthy();
      expect(secondRepositoryItem.getByText("Forks")).toBeTruthy();
      expect(secondRepositoryItem.getByText("3")).toBeTruthy();
      expect(secondRepositoryItem.getByText("Reviews")).toBeTruthy();
      expect(secondRepositoryItem.getByText("72")).toBeTruthy();
      expect(secondRepositoryItem.getByText("Rating")).toBeTruthy();
    });
  });
});
