import Room from "./room"

export default class Item{
    private _id: number | undefined
    private _name: string = ""
    private _room : Room | undefined

    constructor(id:number, name:string, room : Room | undefined){
        this._id = id
        this._name = name
        this._room = room
    }

    get id() : number | undefined {
        return this._id
    }   
    get name() : string {
        return this._name
    }
    
    get room() : Room | undefined {
        return this._room
    }
    
}