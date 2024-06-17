import User from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKeys {
    user
}

export default class StorageHelper{
    public static async set(key : string, value: string) : Promise<void>{
        await AsyncStorage.setItem(key, value);
    }

    public static async get(key : string) :Promise<string | null>{
        let result = await AsyncStorage.getItem(key);
        return result
    }

    public static async setUser(user : User) : Promise<void>{
        let value = JSON.stringify(user.toJson)
        await AsyncStorage.setItem(StorageKeys.user.toString(), value);
    }

    public static async getUser() :Promise<User | null>{
        let result = await AsyncStorage.getItem(StorageKeys.user.toString());
        let user :User | null = null
        if(result != null){
            user = User.fromJson(JSON.parse(result))
        }
        return user
    }

    public static async logout() : Promise<void>{
        await AsyncStorage.removeItem(StorageKeys.user.toString())
    }
}