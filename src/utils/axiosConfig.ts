import axios from 'axios';

// axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common['x-api-key'] = '316aaf64-9980-49ab-bd94-7f174277873a';

const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

instance.defaults.headers.common['x-api-key'] = '316aaf64-9980-49ab-bd94-7f174277873a';

export default instance;