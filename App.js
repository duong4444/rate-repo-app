// // import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View>
//       <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>
//         Đây là văn bản lớn
//       </Text>
//       <Text numberOfLines={1} ellipsizeMode="tail">
//         Văn bản này quá dài và sẽ bị cắt nếu không đủ chỗ hiển thị...
//       </Text>
//       <Text onPress={() => alert("Bạn đã nhấn vào chữ này!")}>
//         Nhấn vào tôi!
//       </Text>
//     </View>
//   );
// }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });
// import { Text, View } from "react-native";


import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";

export default function App() {
  const [text, setText] = useState("");

  return (
    <View style={{ paddingTop: 50 }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, paddingHorizontal: 30 }}
        placeholder="Nhập văn bản ở đây ..."
        onChangeText={(newText) => setText(newText)}
      />
      <Text style={{ marginTop: 10 }}>Bạn đã nhập: {text}</Text>
    </View>
  );
}

