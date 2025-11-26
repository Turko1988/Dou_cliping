const API_URL = 'http://localhost:8000/api';

export const api = {
    /**
     * Busca termos no Diário Oficial da União (DOU)
     * @param {string} term - Termo para busca
     * @returns {Promise<Array>} - Lista de resultados
     */
    searchDOU: async (term) => {
        try {
            const response = await fetch(`${API_URL}/search/dou?q=${encodeURIComponent(term)}`);
            if (!response.ok) {
                throw new Error('Falha na busca do DOU');
            }
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Erro na API:', error);
            throw error;
        }
    },

    /**
     * Health check da API
     */
    checkHealth: async () => {
        try {
            const response = await fetch(`${API_URL}/health`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};
