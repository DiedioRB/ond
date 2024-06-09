import Item from "@/models/item";
import Room from "@/models/room";
import axios from "axios";

const API = {
    random: async () => {
        let random;
        await axios.get('https://api.jikan.moe/v4/random/anime')
            .then((response) => {
                random = response.data['data'].title;
            })
            .catch((reason) => {
                console.log(reason);
            })
        return random ?? "";
    },
    items: async () => {
        let rooms = await API.rooms()

        return [
            new Item(1, 'Livro', rooms[0]),
            new Item(2, 'Caneta', rooms[1]),
            new Item(3, 'Celular', rooms[2]),
            new Item(4, 'Violão', rooms[3]),
            new Item(5, 'Livro', rooms[0]),
            new Item(6, 'Caneta', rooms[1]),
            new Item(7, 'Celular', rooms[2]),
            new Item(8, 'Violão', rooms[3]),
            new Item(9, 'Livro', rooms[0]),
            new Item(10, 'Caneta', rooms[1]),
            new Item(11, 'Celular', rooms[2]),
            new Item(12, 'Violão', rooms[3]),
        ]
    },
    rooms: async () => {
        return [
            new Room(1, 'Quarto'),
            new Room(2, 'Sala'),
            new Room(3, 'Cozinha'),
            new Room(4, 'Quarto de hóspedes'),
            new Room(5, 'Armário grande', 1),
            new Room(6, 'Despensa', 3),
            new Room(7, 'Armário pequeno', 4),
        ]
    },
    parentRoom: async () => {
        return new Room(1, 'Quarto')
    }
}

export default API;