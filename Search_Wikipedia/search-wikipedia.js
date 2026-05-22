const searchInputEl =
  document.getElementById("searchInput");

const searchResultsEl =
  document.getElementById("searchResults");

const spinnerEl =
  document.getElementById("spinner");

/*
==========================================
DEBOUNCE TIMER
==========================================
*/

let debounceTimer;

/*
==========================================
CREATE RESULT CARD
==========================================
*/

function createAndAppendSearchResult(result) {

  const {
    link,
    title,
    description
  } = result;

  const resultItemEl =
    document.createElement("div");

  resultItemEl.classList.add(
    "result-item"
  );

  /*
  TITLE
  */

  const titleEl =
    document.createElement("a");

  titleEl.href = link;

  titleEl.target = "_blank";

  titleEl.rel = "noopener noreferrer";

  titleEl.textContent = title;

  titleEl.classList.add(
    "result-title"
  );

  /*
  URL
  */

  const urlEl =
    document.createElement("a");

  urlEl.href = link;

  urlEl.target = "_blank";

  urlEl.rel = "noopener noreferrer";

  urlEl.textContent = link;

  urlEl.classList.add(
    "result-url"
  );

  /*
  DESCRIPTION
  */

  const descriptionEl =
    document.createElement("p");

  descriptionEl.textContent =
    description;

  descriptionEl.classList.add(
    "link-description"
  );

  /*
  APPEND
  */

  resultItemEl.appendChild(titleEl);

  resultItemEl.appendChild(
    document.createElement("br")
  );

  resultItemEl.appendChild(urlEl);

  resultItemEl.appendChild(
    document.createElement("br")
  );

  resultItemEl.appendChild(
    descriptionEl
  );

  searchResultsEl.appendChild(
    resultItemEl
  );
}

/*
==========================================
DISPLAY RESULTS
==========================================
*/

function displayResults(searchResults) {

  spinnerEl.classList.add(
    "d-none"
  );

  searchResultsEl.innerHTML = "";

  /*
  NO RESULTS
  */

  if (
    !searchResults ||
    searchResults.length === 0
  ) {

    searchResultsEl.innerHTML = `

      <div class="empty-results">

        <h3>No Results Found</h3>

        <p>
          Try searching with another keyword.
        </p>

      </div>

    `;

    return;
  }

  /*
  RENDER RESULTS
  */

  searchResults.forEach((result) => {

    createAndAppendSearchResult(
      result
    );

  });
}

/*
==========================================
SHOW LOADING
==========================================
*/

function showLoading() {

  spinnerEl.classList.remove(
    "d-none"
  );

  searchResultsEl.innerHTML = "";
}

/*
==========================================
SHOW ERROR
==========================================
*/

function showError(message) {

  spinnerEl.classList.add(
    "d-none"
  );

  searchResultsEl.innerHTML = `

    <div class="error-box">

      <h3>Something went wrong</h3>

      <p>${message}</p>

    </div>

  `;
}

/*
==========================================
FETCH SEARCH RESULTS
==========================================
*/

async function fetchSearchResults(
  searchQuery
) {

  if (!searchQuery.trim()) {

    searchResultsEl.innerHTML = "";

    return;
  }

  showLoading();

  try {

    const url =
      "https://apis.ccbp.in/wiki-search?search=" +
      encodeURIComponent(
        searchQuery
      );

    const response =
      await fetch(url);

    /*
    HANDLE FAILED REQUEST
    */

    if (!response.ok) {

      throw new Error(
        "Failed to fetch results."
      );
    }

    const jsonData =
      await response.json();

    const {
      search_results
    } = jsonData;

    displayResults(
      search_results
    );

  } catch (error) {

    console.error(error);

    showError(
      "Unable to load search results."
    );
  }
}

/*
==========================================
SEARCH EVENT
==========================================
*/

function handleSearch(event) {

  const searchInput =
    event.target.value;

  /*
  DEBOUNCE
  */

  clearTimeout(
    debounceTimer
  );

  debounceTimer =
    setTimeout(() => {

      fetchSearchResults(
        searchInput
      );

    }, 500);
}

/*
==========================================
ENTER KEY SUPPORT
==========================================
*/

searchInputEl.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "Enter") {

      clearTimeout(
        debounceTimer
      );

      fetchSearchResults(
        searchInputEl.value
      );
    }
  }
);

/*
==========================================
LIVE SEARCH
==========================================
*/

searchInputEl.addEventListener(
  "input",
  handleSearch
);