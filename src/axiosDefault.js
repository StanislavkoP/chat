import axios from 'axios';

import settings from './defaultSettigs';

const instance = axios.create({
	baseURL : settings.serverURI
});

export default instance;