import axios from 'axios';
import config from '../common/config';

const { COUNTRIES_URL } = config;

export const getAll = async () => await axios.get(COUNTRIES_URL);
