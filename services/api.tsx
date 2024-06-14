import Item from "@/models/item";
import Room from "@/models/room";
import axios from "axios";

const API = {
    items: async () => {
        let rooms = await API.rooms()

        return [
            new Item(1, 'Livro', rooms[0]),
            new Item(2, 'Caneta', rooms[1]),
            new Item(3, 'Celular', rooms[2]),
            new Item(4, 'Violão', rooms[3]),
            new Item(5, 'Caneca', rooms[0]),
            new Item(6, 'Carregador', rooms[1]),
            new Item(7, 'Cabo USB', rooms[2]),
            new Item(8, 'Caixa de ferramentas', rooms[3]),
            new Item(9, 'Controle remoto', rooms[0]),
            new Item(10, 'Chocolate', rooms[1]),
            new Item(11, 'Microfone', rooms[2]),
            new Item(12, 'Fósforos', rooms[3]),
        ]
    },
    item: async (id: any) => {
        return (await API.items()).filter((item) => item.id == id)
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
    room: async (id: any) => {
        return (await API.rooms()).filter((room) => room.id == id)
    },
}

export default API;