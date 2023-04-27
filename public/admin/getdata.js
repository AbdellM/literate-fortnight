const token = localStorage.getItem('token'); // Get the token from LocalStorage
const url = 'http://localhost:3000/cranes/';
let cranes = [];
let isNewCrane = false;
const classTr = 'border-b border-opacity-20 border-gray-300 bg-gray-50';
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
        cranes = data;
        const tableBody = document.querySelector('#craneTable tbody');
        let tableHTML = '';

        data.forEach(crane => {
            tableHTML += `
            <tr class="crane-${crane.id} ${classTr}">
              <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${crane.actualState == "Solved" ? "green" : crane.status == "Critical" ? "red" : crane.status == "UnCritical" ? "lime" : "yellow"}-600 text-gray-50">${crane.crane}</span></td>
              <td ${classTd}>${crane.frequency}</td>
              <td ${classTd}>${crane.downTime}</td>
              <td ${classTd}>${crane.status}</td>
              <td ${classTd}>${crane.timeToRepair}</td>
              <td ${classTd}>${crane.comment}</td>
              <td ${classTd}>${crane.actualState}</td>
              
              <td ${classTd}>
                <button class="px-3 py-1 font-semibold rounded-md bg-gray-600 text-gray-50 edit" onclick="editCrane(${crane.id})" >Edit</button>
                <button class="px-3 py-1 font-semibold rounded-md bg-gray-600 text-gray-50 delete" onclick="deleteCrane(${crane.id})" >Delete</button>
              </td>
            </tr>
          `;
        });

        tableBody.innerHTML = tableHTML;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

