import axios from 'axios';

export const userFetcher = url => axios.get(url).then(res => res.data);
export const boardFetcher = url => axios.get(url).then(res => res.data.body);