import StorageHelper from "@/helpers/storage_helper";
import Item, { ItemType } from "@/models/item";
import User from "@/models/user";
import axios from "axios";

const BASE_URL = "http://192.168.15.187:8080/"

const API = {
    userPath: async() : Promise<string> => {
        let user :User | null = await StorageHelper.getUser()
        if(user != null){
            return "users/"+user.id+"/"
        }
        return ""
    },
    login: async (email :string, password :string) : Promise<User | undefined> => {
        let found :User | undefined
        const endpoint = "users/login"
        await axios.post(BASE_URL+endpoint, 
            JSON.stringify({
                email: email,
                password: password,
            }),
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then((response) => {
            console.log(response);
            
            if(response.status == 200){
                found = User.fromJson(response.data)
            }else{
                found = undefined
            }
        })
        .catch((reason) => {
            console.log(reason);
        })

        return found
    },
    register: async (name:string, email :string, password :string) : Promise<User | undefined> => {
        let found :User | undefined
        const endpoint = "users/register"
        await axios.post(BASE_URL+endpoint, 
            JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )
        .then((response) => {
            if(response.status == 200){
                found = User.fromJson(response.data)
            }else{
                found = undefined
            }
        })
        .catch((reason) => {
            console.log(reason);
        })

        return found
    },
    room: async (id: any) : Promise<Item | undefined> => {
        let room : Item | undefined = undefined

        const endpoint = (await API.userPath())+"items/"+id
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
        const endpoint = parentId ? (await API.userPath())+"items/"+parentId+"/items" : (await API.userPath())+"items"
        
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
        const endpoint = (await API.userPath())+"items/rooms/bases"
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
        const endpoint = (await API.userPath())+"items/rooms"
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
        const endpoint = (await API.userPath())+"items/search/"+term
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
        const endpoint = (await API.userPath())+"items"
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
    },
    deleteItem: async (item :Item) : Promise<boolean> => {
        let success : boolean = false
        const endpoint = (await API.userPath())+"items/"+item.id
        await axios.delete(BASE_URL+endpoint, 
            {
                data: JSON.stringify(item.toJson),
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
    },
}

export default API;