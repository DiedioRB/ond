import Item, { ItemType } from "@/models/item";
import axios from "axios";

const BASE_URL = "http://localhost:8080/"

const API = {
    room: async (id: any) : Promise<Item | undefined> => {
        let room : Item | undefined = undefined

        const endpoint = "items/"+id
        await axios.get(BASE_URL+endpoint)
            .then((response) => {
                let json : Map<string, any>[] = response.data
                room = Item.fromJson(json)
            })
            .catch((reason) => {
                console.log(reason);
            })
        return room
    },
    items: async (parentId? : any) : Promise<Item[]> => {
        let items : Item[] = [];
        const endpoint = parentId ? "items/"+parentId+"/items" : "items"
        
        await axios.get(BASE_URL+endpoint)
            .then((response) => {
                let json : Map<string, any>[] = response.data
                for(let item of json){
                    items.push(Item.fromJson(item))
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
            
        return items;
    },
    baseRooms: async () : Promise<Item[]> => {
        let rooms : Item[] = []
        const endpoint = "items/rooms/bases"
        await axios.get(BASE_URL+endpoint)
            .then((response) => {
                let json : Map<string, any>[] = response.data
                
                for(let item of json){
                    rooms.push(Item.fromJson(item))
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
        
        return rooms
    },
    rooms: async () : Promise<Item[]> => {
        let rooms : Item[] = []
        const endpoint = "items/rooms"
        await axios.get(BASE_URL+endpoint)
            .then((response) => {
                let json : Map<string, any>[] = response.data
                
                for(let item of json){
                    rooms.push(Item.fromJson(item))
                }
            })
            .catch((reason) => {
                console.log(reason);
            })
        
        return rooms
    },
    searchItem: async (term : any) : Promise<Item[]> => {
        let rooms : Item[] = []
        const endpoint = "items/search/"+term
        await axios.get(BASE_URL+endpoint)
            .then((response) => {
                let json : Map<string, any>[] = response.data
                
                for(let item of json){
                    rooms.push(Item.fromJson(item))
                }
            })
            .catch((reason) => {
                console.log(reason);
            })

        return rooms
    },
    saveItem: async (item :Item) : Promise<boolean> => {
        let success : boolean = false
        const endpoint = "items"
        await axios.post(BASE_URL+endpoint, 
            JSON.stringify(item.toJson),
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then((response) => {
            if(response.status == 200){
                success = true
            }
            success = false
        })
        .catch((reason) => {
            console.log(reason);
        })

        return success
    }
}

export default API;