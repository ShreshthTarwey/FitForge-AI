import api from './axios';

export const aiService = {
    chat: (message, history) => api.post('/api/ai/chat', { message, history }),
};
