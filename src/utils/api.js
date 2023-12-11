import axios from "axios";

const api = axios.create({
    baseURL: "https://be-urban-robot-production.up.railway.app/api",
    timeout: 1000,
});

export const getArticles = async (p = 1) => {
    const { data } = await api.get(`/articles?p=${p}`);
    return data;
};
