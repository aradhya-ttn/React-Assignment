import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-bootcamp.firebaseio.com/'
});

export default instance;