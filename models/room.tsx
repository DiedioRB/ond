import API from "@/services/api"

export default class Room{
    private _id: number | undefined
    private _name: string = ""
    
    public hasParent: boolean = false
    private _parent?: Room
    private _parentId?: number

    public parentLoaded: boolean = false

    constructor(id:number, name:string, parentId?:number){
        this._id = id
        this._name = name
        if(parentId){
            this.hasParent = true
            this._parentId = parentId
            this.parentLoaded = true
        }
    }

    public async getParent() : Promise<Room | undefined>{
        if(this._parentId && !this.parentLoaded){
            console.log("loading parent: ", this._parentId);
            
            let rooms : Room[] = await API.rooms()
            this._parent = rooms.find((item) => {item._parentId == this._parentId}) ?? undefined
        }
        this.parentLoaded = true
        return this._parent
    }

    get id() : number | undefined {
        return this._id
    }   
    get name() : string {
        return this._name
    }

    get parentId() : number | undefined{
        return this._parentId
    }

    get parent() : Room | undefined{
        return this._parent
    }

}