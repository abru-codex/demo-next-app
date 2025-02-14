import axios from 'axios';

const API_URL = 'https://localhost:7271/api';

const websiteService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${API_URL}/Website`);
            return response.data;
        } catch (error) {
            console.error('Error fetching websites:', error);
            throw error;
        }
    },

    getById: async (id: string) => {
        try {
            const response = await axios.get(`${API_URL}/Website/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching website with id ${id}:`, error);
            throw error;
        }
    },

    create: async (websiteData: any) => {
        try {
            const response = await axios.post(`${API_URL}/Website`, websiteData);
            return response.data;
        } catch (error) {
            console.error('Error creating website:', error);
            throw error;
        }
    },

    update: async (id: string, websiteData: any) => {
        try {
            const response = await axios.put(`${API_URL}/Website/${id}`, websiteData);
            return response.data;
        } catch (error) {
            console.error(`Error updating website with id ${id}:`, error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const response = await axios.delete(`${API_URL}/Website/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting website with id ${id}:`, error);
            throw error;
        }
    }
};

export default websiteService;