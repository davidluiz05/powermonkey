import { NativeStorage } from 'ionic-native';

export class CStorage {
    static writeJSON(data : Object) : Promise<any> {
        return NativeStorage.setItem('data', data);
    }

    static readJSON() : Promise<Object> {
        return NativeStorage.getItem("data");
    }
}