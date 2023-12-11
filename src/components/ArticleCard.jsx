/* eslint-disable react/prop-types */
export default function ArticleCard(props) {
    const { article } = props;
    return (
        <li className="border p-4 list-none">
            <h2>{article.title}</h2>
            <p>{article.topic}</p>
        </li>
    );
}
