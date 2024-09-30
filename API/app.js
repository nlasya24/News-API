let newsContainer = document.getElementById('news-container');
let apiURL = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=45a8a05f784149f88aa2aef2e47261c4";
let localURL = "api.json"; // Path to the local JSON file

function GetNews(url) {
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
            console.error('Error fetching from API, using local JSON as fallback:', error);
            LoadLocalNews();  // Call fallback function on error
        });
}

function LoadLocalNews() {
    fetch(localURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Display the local news articles
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
            console.error('Error fetching local news:', error);
            newsContainer.innerHTML = `<p>Failed to fetch news from both the API and local JSON file. Error: ${error.message}</p>`;
        });
}

// Fetch news when the page loads, start with the API URL
window.onload = () => {
    GetNews(apiURL);
};
