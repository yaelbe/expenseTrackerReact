import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService {
  async getUserFromStorage() {
    try {
      const userName = await AsyncStorage.getItem('userName');
      return userName;
    } catch {
      return null;
    }
  }

  async login(username: string) {
    try {
      await AsyncStorage.setItem('userName', username);
    } catch {}
  }
}

export const userService = new UserService();
