import axios from "axios";

const api = axios.create({
    baseURL: "https://be-urban-robot-production.up.railway.app/api",
    timeout: 1000,
});

export const getArticles = async (p = 1) => {
    const { data } = await api.get(`/articles?p=${p}`);
    return data;
};

export const getSingleArticle = async (id) => {
    const { data } = await api.get(`/articles/${id}`);
    return data;
};

export const getArticleComments = async (id) => {
    const { data } = await api.get(`/articles/${id}/comments`);
    return data;
};

export const getArticlePageData = async (id) => {
    return await Promise.all([getSingleArticle(id), getArticleComments(id)]);
};

export const vote = async (id) => {
    try {
        const { data } = await api.patch(`/articles/${id}`, { inc_votes: 1 });
        return data;
    } catch (error) {
        console.error(error);
    }
};
