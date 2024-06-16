export enum ItemType {
    ITEM="ITEM", ROOM="ROOM"
}

export default class Item{
    private _id: number | undefined | null
    private _name: string = ""
    private _parent : Item | undefined
    private _kind : ItemType
    private _items : Item[]

    constructor(id:number | null, name:string, parent : Item | undefined, kind : ItemType, items? : Item[]){
        this._id = id
        this._name = name
        this._parent = parent
        this._kind = kind
        this._items = items ?? []
    }

    get id() : number | undefined | null {
        return this._id
    }   
    get name() : string {
        return this._name
    }
    
    get parent() : Item | undefined {
        return this._parent
    }

    get kind() : ItemType {
        return this._kind
    }

    get items() : Item[] {
        return this._items
    }

    get toJson() : Map<String, any> {
        let json : any = {
            id: this.id,
            name: this.name,
            parent: this.parent?.toJson,
            kind: this.kind,
        }
        return json
    }

    static fromJson(json : any) : Item{
        let items : Item[] = []
        if(json.items != undefined){
            for(let item of json.items){
                items.push(Item.fromJson(item))
            }
        }

        return new Item(
            json.id,
            json.name,
            json.parent ? Item.fromJson(json.parent) : undefined,
            json.kind,
            items
        )
    }
    
}