// apiService.js
import axios from 'axios';

const API_KEY = '7b84a2717bmsh3b3057b21c547e9p1eb670jsn31e6997ac2a0';
const API_HOST = 'sky-scrapper.p.rapidapi.com';

export const apiClient = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com',
    headers: {
        'x-rapidapi-host': API_HOST,
        'x-rapidapi-key': API_KEY,
    },
});

export const getConfig = async () => {
    try {
        const response = await apiClient.get('/api/v1/getConfig');
        return response.data;
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error;
    }
};

export const searchAirports = async (query) => {
    try {
        const response = await apiClient.get('/api/v1/flights/searchAirport', {
            params: {query}
        });


        return response.data.data.filter(
            item => item.navigation.entityType === 'AIRPORT'
        );
        ;
    } catch (error) {
        console.error('Error fetching airports:', error);
        throw error;
    }
};

export const searchFlights = async ({
                                        originSkyId,
                                        destinationSkyId,
                                        originEntityId,
                                        destinationEntityId,
                                        date,
                                        returnDate,
                                        cabinClass,
                                        adults,
                                        childrens,
                                        infants,
                                        sortBy,
                                        currency
                                    }) => {
    try {
        const params = {
            originSkyId,
            destinationSkyId,
            originEntityId,
            destinationEntityId,
            date,
            adults: adults || 1
        };

        if (returnDate) params.returnDate = returnDate;
        if (cabinClass) params.cabinClass = cabinClass;
        if (childrens) params.childrens = childrens;
        if (infants) params.infants = infants;
        if (sortBy) params.sortBy = sortBy;
        if (currency) params.currency = currency;

        const response = await apiClient.get('/api/v1/flights/searchFlights', {params});
        return response.data;
    } catch (error) {
        console.error('Error fetching flight data:', error);
        throw error;
    }
};