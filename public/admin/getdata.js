const token = localStorage.getItem('token'); // Get the token from LocalStorage
const url = 'http://localhost:3000/cranes';

fetch(url, {
    headers: {
        'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
        'Content-Type': 'application/json' // Set the content type of the request body
    }
})
    .then(response => {
        if (response.ok) {
            return response.json(); // If the response is ok, parse the response body as JSON
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        localStorage.setItem("cranes", JSON.stringify(data));
        const tableBody = document.querySelector('#craneTable tbody');
        let tableHTML = '';

        data.forEach(crane => {
            tableHTML += `
            <tr class="crane-${crane.id}">
              <td>${crane.name}</td>
              <td>${crane.capacity}</td>
              <td>${crane.type}</td>
              <td>${crane.location}</td>
              <td>
                <button class="edit" onclick="editCrane(${crane.id})" >Edit</button>
              </td>
            </tr>
          `;
        });

        tableBody.innerHTML = tableHTML;

        const editButtons = document.querySelectorAll('.editBtn');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                editCrane(button.dataset.id);
            });
        });

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

