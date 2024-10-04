let newsContainer = document.getElementById('news-container');
let url = "/index.json"; // Path to your local JSON file

function GetNews() {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Display the news articles
            newsContainer.innerHTML = '';
            data.articles.forEach(article => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';

                const imageUrl = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/300x150';
                const newsHTML = `
                    <img src="${imageUrl}" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p>${article.description ? article.description : 'No description available.'}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;

                newsCard.innerHTML = newsHTML;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch((error) => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<p>Failed to fetch news. Error: ${error.message}</p>`;
        });
}

// Fetch news when the page loads
window.onload = () => {
    GetNews();
};
