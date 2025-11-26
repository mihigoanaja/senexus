const params = new URL(import.meta.url).searchParams;
const type = params.get("type");
// Function to get query parameters from the URL
        function getQueryParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        // Function to perform search
        function performSearch(query) {
            fetch(`https://apiproxy.alreflections.net/atinas/search?type=${type}&q= ${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => {
                    displayResults(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('resultsContainer').innerHTML = '<p>Error fetching results. Please try again.</p>';
                });
        }

        // Function to display results
        function displayResults(data) {
            const resultsContainer = document.getElementById('resultsContainer');
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>';
                return;
            }

            data.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.description}</p>
                `;
                resultsContainer.appendChild(resultItem);
            });
        }

        // Event listener for the search button
        document.getElementById('searchButton').addEventListener('click', function() {
            const query = document.getElementById('searchQuery').value;
            if (query) {
                performSearch(query);
            } else {
                alert('Please enter a search term.');
            }
        });

        // Check for 'q' parameter in the URL and perform search
        const queryParam = getQueryParameter('q')||'a';
        if (queryParam) {
            document.getElementById('searchQuery').value = (queryParam=='a')?null:queryParam; // Set the input value
            performSearch(queryParam); // Perform search with the query
        } else {
            performSearch('a'); // Perform search with an empty query
        }
