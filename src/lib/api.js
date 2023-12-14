import axios from "axios";

const api = axios.create({
    baseURL: "https://be-urban-robot-production.up.railway.app/api",
    timeout: 3000,
});

// eslint-disable-next-line no-unused-vars
export const getArticles = async (page = 1, queries) => {
    const { topic, sort } = queries;
    let url = `/articles?p=${page}`;

    if (topic) {
        url += `&topic=${topic}`;
    }

    if (sort && sort.order && sort.sortBy) {
        url += `&sort_by=${sort.sortBy.toLowerCase()}&order=${sort.order.toLowerCase()}`;
    }

    const { data } = await api.get(url);
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
        throw new Error("error updating votes");
    }
};

export const postComment = async (id, newComment) => {
    try {
        const { data } = await api.post(`/articles/${id}/comments`, newComment);
        return data;
    } catch (error) {
        throw new Error("error inserting comment");
    }
};

export const deleteComment = async (id) => {
    try {
        await api.delete(`/comments/${id}`);
    } catch (error) {
        throw new Error("error deleting comment");
    }
};

export const getTopics = async () => {
    try {
        const { data } = await api.get("/topics");
        return data;
    } catch (error) {
        throw new Error("error fetching topics data");
    }
};
