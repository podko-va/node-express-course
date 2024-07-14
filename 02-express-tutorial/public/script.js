document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const search = document.getElementById('search').value;
    const limit = document.getElementById('limit').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minPrice = document.getElementById('minPrice').value;
    const sort = document.getElementById('sort').value;

    let query = '/api/v1/query?';

    if (search) {
        query += `search=${search}&`;
    }
    if (limit) {
        query += `limit=${limit}&`;
    }
    if (maxPrice) {
        query += `maxPrice=${maxPrice}&`;
    }
    if (minPrice) {
        query += `maxPrice=${minPrice}&`;
    }

    fetch(query)
        .then(response => response.json())
        .then(data => {

            if (sort === 'name') {
                data.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sort === 'price') {
                data.sort((a, b) => a.price - b.price);
            }
            
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            if (data.length > 0) {
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.innerHTML = `<p>${product.name}: $${product.price.toFixed(2)}</p>`;
                    resultsDiv.appendChild(productDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>No products found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
