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
        console.log(data); // Do something with the response data
        const tableBody = document.querySelector('#craneTable tbody');
        let tableHTML = '';

        data.forEach(crane => {
            tableHTML += `
            <tr>
            <td>${crane.crane}</td>
            <td>${crane.frequency}</td>
            <td>${crane.downTime}</td>
            <td>${crane.status}</td>
            <td>${crane.timeToRepair}</td>
            <td>${crane.comment}</td>
            <td>${crane.actualState}</td>
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

