export default class User{
    private _id: number | undefined | null
    private _name: string = ""
    private _email : string
    private _password : string

    constructor(id:number | null, name:string, email : string, password : string){
        this._id = id
        this._name = name
        this._email = email
        this._password = password
    }

    get id() : number | undefined | null {
        return this._id
    }   
    get name() : string {
        return this._name
    }
    
    get email() : string {
        return this._email
    }

    get password() : string {
        return this._password
    }

    get toJson() : Map<String, any> {
        let json : any = {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
        }
        return json
    }

    static fromJson(json : any) : User{
        return new User(
            json.id,
            json.name,
            json.email,
            json.password,
        )
    }
    
}