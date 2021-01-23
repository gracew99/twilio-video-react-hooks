import axios from 'axios';
const port = process.env.PORT || 8000;

const instance = axios.create({
    baseURL: "https://gracew-debate.herokuapp.com/"
})

export default instance;

