const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=44eca781d6fb4e2da8fd8e7969b3b375';
const newsContainer = document.getElementById('news');

// Make an AJAX request to the News API
function getNewsData(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      callback(data);
    } else {
      console.error('Failed to fetch news data');
    }
  };
  xhr.send();
}

// Callback function to display news content
function displayNews(data) {
  if (data.articles && data.articles.length > 0) {
    const articles = data.articles;

    // Create HTML markup for each article
    const newsHTML = articles.map(article => `
      <article class="news-article">
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </article>
    `).join('');

    // Update the news container with the generated HTML
    newsContainer.innerHTML = newsHTML;
  } else {
    newsContainer.innerHTML = '<p>No news available at the moment.</p>';
  }
}

// Add an event listener to a button for fetching news
document.querySelector('button').addEventListener('click', () => {
  // Change the button text to indicate loading
  document.querySelector('button').textContent = 'Loading...';
  
  // Fetch news data and pass the displayNews callback
  getNewsData(newsApiUrl, displayNews);
});
