const token = localStorage.getItem('token'); // Get the token from LocalStorage
const url = 'http://localhost:3000/cranes';
const classTr = 'class="border-b border-opacity-20 border-gray-300 bg-gray-50"';
const classTd = 'class="p-3"';

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
            <tr ${classTr}>
                <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${crane.actualState == "To Do" ? "red" : crane.actualState == "Solved" ? "green" : "yellow"}-600 text-gray-50">${crane.crane}</span></td>
                <td ${classTd}>${crane.frequency}</td>
                <td ${classTd}>${crane.downTime}</td>
                <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${crane.status == "Critical" ? "red" : crane.status == "UnCritical" ? "green" : "yellow"}-600 text-gray-50">${crane.status}</span></td>
                <td ${classTd}>${crane.timeToRepair}</td>
                <td ${classTd}>${crane.comment}</td>
                <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${crane.actualState == "To Do" ? "red" : crane.actualState == "Solved" ? "green" : "yellow"}-600 text-gray-50">${crane.actualState}</span></td>
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

