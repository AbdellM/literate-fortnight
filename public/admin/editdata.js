function editCrane(id) {
    let craneData = cranes.find(crane => crane.id == id);
    let crane = document.querySelector(`.crane-${id}`);
    crane.innerHTML = ` 
        <tr class="crane-${craneData.id}">
            <td><input type='text' for='crane' value='${craneData.crane}' /></td>
            <td><input type='text' for='frequency' value='${craneData.frequency}' /></td>
            <td><input type='text' for='downTime' value='${craneData.downTime}' /></td>
            <td><input type='text' for='status' value='${craneData.status}' /></td>
            <td><input type='text' for='timeToRepair' value='${craneData.timeToRepair}' /></td>
            <td><input type='text' for='comment' value='${craneData.comment}' /></td>
            <td><input type='text' for='actualState' value='${craneData.actualState}' /></td>
            <td>
                <button class="save" onclick="updateCrane(${craneData.id})" >Save</button>
            </td>
    </tr>
`;
}

function updateCrane(id) {
    let crane = document.querySelector(`.crane-${id}`);

    let craneObject = {
        id: id,
        crane: crane.querySelector('[for="crane"]').value,
        frequency: crane.querySelector('[for="frequency"]').value,
        downTime: crane.querySelector('[for="downTime"]').value,
        status: crane.querySelector('[for="status"]').value,
        timeToRepair: crane.querySelector('[for="timeToRepair"]').value,
        comment: crane.querySelector('[for="comment"]').value,
        actualState: crane.querySelector('[for="actualState"]').value
    };

    fetch(url + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(craneObject),
    })
        .then(response => response.json())
        .then(data => {
            cranes[id - 1] = data;

            crane.innerHTML = `
            <tr class="crane-${data.id}">
                <td>${data.crane}</td>
                <td>${data.frequency}</td>
                <td>${data.downTime}</td>
                <td>${data.status}</td>
                <td>${data.timeToRepair}</td>
                <td>${data.comment}</td>
                <td>${data.actualState}</td>
                <td>
                    <button class="edit" onclick="editCrane(${data.id})" >Edit</button>
                </td>
            </tr>
            `;

        })
        .catch(error => console.error(error));

}

function newCrane() {
    if (isNewCrane == false) {
        let tableBody = document.querySelector('#craneTable tbody');
        tableBody.innerHTML += `
        <tr class="crane-new">
            <td><input type='text' for='crane' value='' /></td>
            <td><input type='text' for='frequency' value='' /></td>
            <td><input type='text' for='downTime' value='' /></td>
            <td><input type='text' for='status' value='' /></td>
            <td><input type='text' for='timeToRepair' value='' /></td>
            <td><input type='text' for='comment' value='' /></td>
            <td><input type='text' for='actualState' value='' /></td>
            <td>
                <button class="save" onclick="saveCrane()" >Save</button>
            </td>
        </tr>
    `;
        isNewCrane = true;
    }
}

function saveCrane() {
    let crane = document.querySelector(`.crane-new`);
    crane.classList.remove('crane-new');

    let craneObject = {
        crane: crane.querySelector('[for="crane"]').value,
        frequency: crane.querySelector('[for="frequency"]').value,
        downTime: crane.querySelector('[for="downTime"]').value,
        status: crane.querySelector('[for="status"]').value,
        timeToRepair: crane.querySelector('[for="timeToRepair"]').value,
        comment: crane.querySelector('[for="comment"]').value,
        actualState: crane.querySelector('[for="actualState"]').value
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(craneObject),
    })
        .then(response => response.json())
        .then(data => {
            cranes.push(data);

            crane.classList.add(`crane-${data.id}`);

            crane.innerHTML = `
        <tr class="crane-${data.id}">
            <td>${data.crane}</td>
            <td>${data.frequency}</td>
            <td>${data.downTime}</td>
            <td>${data.status}</td>
            <td>${data.timeToRepair}</td>
            <td>${data.comment}</td>
            <td>${data.actualState}</td>
            <td>
                <button class="edit" onclick="editCrane(${data.id})" >Edit</button>
            </td>
        </tr>
        `;

            isNewCrane = false;
        })
        .catch(error => console.error(error));

}