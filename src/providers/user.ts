
export class UserData{
    static loginStatus: boolean = false;
    static email: String;
    static uid : String;
    static displayName: String;

    static programid : Number = -1;
    static level : Number = 1;


    static login(email, uid, displayName){
        UserData.email = email;
        UserData.uid = uid;
        UserData.displayName = displayName;
        UserData.loginStatus = true;
    }

    static getUserEmail() : String{
        return UserData.email;
    }

    static getUserId() : String{
        return UserData.uid;
    }

    static getDisplayName() : String{
        return UserData.displayName;
    }

    static setCurrentProgramId(id: number){
        UserData.programid = id;
    }

    static getCurrentProgramId(): Number{
        return UserData.programid;
    }

    static isLogged() : Boolean{
        return UserData.loginStatus;
    }

    static isEmptyCurrentProgramId(): Boolean{
        return (UserData.programid == -1);
    }

    static setLevel(level: number){
        UserData.level = level;
    }

    static getLevel(){
        return UserData.level;
    }
}