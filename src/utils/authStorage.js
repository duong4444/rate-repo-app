import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  getAccessToken() {
    // Get the access token for the storage
    const access_token = AsyncStorage.getItem(`${this.namespace}:auth`);
    return access_token ? access_token : "";
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    console.log(accessToken);
    const stringify = JSON.stringify(accessToken);
    console.log(stringify);
    
    try {
      await AsyncStorage.setItem(
        `${this.namespace}:auth`,
        accessToken
      );
    } catch (e) {
      console.log("err in method setAccessToken: ", e);
    }
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;
