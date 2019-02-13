import axios from 'axios';

const instance = axios.create({
	baseURL : 'http://2642c350.ngrok.io/'
});

export default instance;