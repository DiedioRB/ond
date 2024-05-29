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
    }
}

export default API;