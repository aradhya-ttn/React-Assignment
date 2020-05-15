import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-burger-project-169d4.firebaseio.com/'
});

export default instance;