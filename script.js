const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function fetchNewsData() {
  fetch(
    `https://newsapi.org/v2/everything?q=${
      params.category ? params.category : "all"
    }&apiKey=b558827ab201473da7963c9a539615c5`
  )
    .then((res) => res.json())
    .then((res) => displayNewsData(res.articles))
    .catch((err) => console.error("Error in fetch data", err));
}

function displayNewsData(data) {
  for (const news of data) {
    //! Create data element
    const newsCardDivElement = document.createElement("div");
    const newsCardContentDivElement = document.createElement("div");
    const newsPublicationInfoDivElement = document.createElement("div");
    const imageElement = document.createElement("img");
    const dateElement = document.createElement("p");
    const publicationElement = document.createElement("p");
    const titleElement = document.createElement("h1");
    const descriptionElement = document.createElement("p");

    //! appropriate classes
    newsCardDivElement.className = "news-card";
    imageElement.className = "news-image";
    newsCardContentDivElement.className = "news-card-content";
    newsPublicationInfoDivElement.className = "news-publication-info";
    dateElement.id = "date";
    publicationElement.id = "publication";
    titleElement.className = "news-title";
    descriptionElement.className = "news-description";

    //! Add click listener
    newsCardDivElement.addEventListener("click", function () {
      window.open(news.url);
    });

    //! Insert data into element
    imageElement.src = news.urlToImage;
    imageElement.alt = "News Image";
    dateElement.innerHTML = news.publishedAt;
    // dateElement.innerHTML = moment(news.publishedAt).formate("DD/MM/YYYY");
    publicationElement.innerHTML = news.source.name;
    titleElement.innerHTML = news.title;
    descriptionElement.innerHTML = news.description;

    //! Append into classes
    newsPublicationInfoDivElement.append(dateElement, publicationElement);
    newsCardContentDivElement.append(
      newsPublicationInfoDivElement,
      titleElement,
      descriptionElement
    );
    newsCardDivElement.append(imageElement, newsCardContentDivElement);

    document.querySelector(".news-list").appendChild(newsCardDivElement);
  }
}

if (params.category) {
}
