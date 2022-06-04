import axios from 'axios';
import config from '../common/config';
import { Country } from '../common/types';

const { COUNTRIES_URL } = config;

export const getCountries = async (filter?: string, order?: string): Promise<Country[]> => {
    let countries: Country[];
    const response = await axios.get(COUNTRIES_URL);
    if (response.data) {
        countries = response.data;
        if (filter) {
            countries = countries.filter(item => item.country.toLowerCase().includes(filter) || item.code.toLowerCase().includes(filter));
        }
        if (order) {
            countries = countries.sort((a, b) => (order === 'asc' ? (a.vat - b.vat) : (b.vat - a.vat)));
        }
        return countries;
    } else {
        throw new Error;
    }
};
