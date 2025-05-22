import { RepoItemDetail } from "./RepositoryList";
import { FlatList, StyleSheet, View, Alert, Button } from "react-native";
import useRepoReview from "../hooks/useRepoReview";
import { ItemSeparator } from "./RepositoryList";
import { useParams } from "react-router-native";
import { Text } from "react-native";
import useDeleteReview from "../hooks/useDeleteReview";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container_data: {
    flexDirection: "row",
    padding: 9,
    // paddingLeft: 30,
    justifyContent: "flex-start",
  },
  btn: {
    flex: 1,
    marginHorizontal: 5,
    height: 50, // Increase button height
    justifyContent: "center",
  },
  outer_container: {
    flex: 1,
    flexDirection: "column",
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  text: {
    fontSize: 15,
  },
  rating: {
    borderBlockColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: "blue",
    borderWidth: 2,
  },
  container_column: {
    flex: 1, // chiếm hết phần còn trống của cpn cha
    flexDirection: "column",
    marginLeft: 10,
  },
  btn_container: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

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
export const ReviewItem = ({ review, showBtn, refetch }) => {
  // review là {chứa id: "" , rating : "", text: ""}
  const navigate = useNavigate();
  const [delete_review] = useDeleteReview();

  const handleViewRepository = (repo_id) => {
    console.log("navigate to detail repo");

    navigate(`/${repo_id}`);
  };

  const handleDeleteReview = async (review_id) => {
    const data = await delete_review(review_id);
    console.log("log sau khi goi delete_review ", data);

    if (data) {
      console.log("Review deleted successfully");
      await refetch();
      console.log("Refetch called");
    }
  };
  const showAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("cancel btn"),
          style: "cancel",
        },
        {
          text: "DELETE",
          onPress: () => handleDeleteReview(review.id),
          style: "default",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => console.log("bam ra ngoai =  huy"),
      }
    );

  return (
    <View style={styles.outer_container}>
      <View style={styles.container_data}>
        <View style={styles.rating}>
          <Text style={{ color: "blue" }}>{review.rating}</Text>
        </View>
        <View style={styles.container_column}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {review.user.username}
          </Text>
          <Text style={styles.text}>{formatDate(review.createdAt)}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {showBtn && (
        <View style={styles.btn_container}>
          <View style={styles.btn}>
            <Button
              title="View repository"
              onPress={() => handleViewRepository(review.repository.id)}
              color="#0366d6"
            />
          </View>
          <View style={styles.btn}>
            <Button title="Delete review" onPress={showAlert} color="#d73a4a" />
          </View>
        </View>
      )}
    </View>
  );
};
// hiện 1 cục và các review
const SingleRepository = () => {
  const { id } = useParams();
  // console.log("log id trong SingleRepo: ", id);

  // tạo infinite scrolling cho reviews của singleRepository
  // trường reviews có arg : first,after
  //   {
  //   repository(id: "jaredpalmer.formik") {
  //     id
  //     fullName
  //     reviews(first: 2, after: "WyIxYjEwZTRkOC01N2VlLTRkMDAtODg4Ni1lNGEwNDlkN2ZmOGYuamFyZWRwYWxtZXIuZm9ybWlrIiwxNTg4NjU2NzUwMDgwXQ==") {
  //       totalCount
  //       edges {
  //         node {
  //           id
  //           text
  //           rating
  //           createdAt
  //           repositoryId
  //           user {
  //             id
  //             username
  //           }
  //         }
  //         cursor
  //       }
  //       pageInfo {
  //         endCursor
  //         startCursor
  //         hasNextPage
  //       }
  //     }
  //   }
  // }
  // cache same với repositories query
  //

  const { reviews, loading,fetchMore } = useRepoReview({id,first:5});
  // console.log("giá trị reviews ",reviews);
  
  if (loading) {
    return <Text>Loading...</Text>;
  }
  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  // console.log("log reviewNodes in SingleRepo: ", reviewNodes);

  const onEndReach = () => {
    fetchMore();
    console.log("cuối reviews list");
    
  }

  // reviewNodes là [] chứa {id,text,rating,createAt,user{username}}
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} showBtn={false} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <RepoItemDetail />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
export default SingleRepository;
