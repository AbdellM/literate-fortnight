const classInput = 'class="w-full p-2 text-sm rounded-md focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-200 border border-gray-300 focus:border-orange-600"';

function editCrane(id) {
    let craneData = cranes.find(crane => crane.id == id);
    console.log(craneData);
    let crane = document.querySelector(`.crane-${id}`);
    crane.innerHTML = ` 
        <tr class="crane-${craneData.id}">
            <td ${classTd}><input ${classInput} type='text' placeholder='crane' name='crane' value='${craneData.crane}' /></td>
            <td ${classTd}>
                <select ${classInput} name='frequency'>
                    <option ${craneData.frequency == " F < 2" ? "selected" : ""} value=" F < 2"> F < 2</option>
                    <option ${craneData.frequency == "2 < F < 6" ? "selected" : ""} value="2 < F < 6">2 < F < 6</option>
                    <option ${craneData.frequency == "F > 6" ? "selected" : ""} value="F > 6">F > 6</option>
                </select>
            </td>
            <td ${classTd}>
                <select ${classInput} name='downTime'>
                    <option ${craneData.downTime == "BD (breakdown)" ? "selected" : ""} value="BD (breakdown)">BD (breakdown)</option>
                    <option ${craneData.downTime == "BD OOO (breakdown out of operation)" ? "selected" : ""} value="BD OOO (breakdown out of operation)">BD OOO (breakdown out of operation)</option>
                    <option ${craneData.downTime == " > 30 min" ? "selected" : ""} value=" > 30 min"> > 30 min</option>
                    <option ${craneData.downTime == " > 10 min " ? "selected" : ""} value=" > 10 min "> > 10 min </option>
                </select>
            </td>
            <td ${classTd}>
                <select ${classInput} name='status'>
                    <option ${craneData.status == "UnCritical" ? "selected" : ""} value="UnCritical">UnCritical</option>
                    <option ${craneData.status == "Tolerable" ? "selected" : ""} value="Tolerable">Tolerable</option>
                    <option ${craneData.status == "Critical" ? "selected" : ""} value="Critical">Critical</option>
                </select>
            </td>
            <td ${classTd}>
                <select ${classInput} name='timeToRepair'>
                    <option ${craneData.timeToRepair == "  > 16h" ? "selected" : ""} value="  > 16h">  > 16h</option>
                    <option ${craneData.timeToRepair == "8 - 16h" ? "selected" : ""} value="8 - 16h">8 - 16h</option>
                    <option ${craneData.timeToRepair == " 2 - 8h " ? "selected" : ""} value=" 2 - 8h "> 2 - 8h </option>
                    <option ${craneData.timeToRepair == "0 - 2h" ? "selected" : ""} value="0 - 2h">0 - 2h</option>
                </select>
            </td>             
            <td ${classTd}><input ${classInput} type='text' placeholder='comment' name='comment' value='${craneData.comment}' /></td>
            <td ${classTd}>
                <select ${classInput} name='actualState'>
                    <option ${craneData.actualState == "Solved" ? "selected" : ""} value="Solved">Solved</option>
                    <option ${craneData.actualState == "On Going" ? "selected" : ""} value="On Going">On Going</option>
                    <option ${craneData.actualState == "To Do" ? "selected" : ""} value="To Do">To Do</option>
                </select>
            </td>
            <td ${classTd}>
                <button class="px-3 py-1 font-semibold rounded-md bg-green-600 text-gray-50 save" onclick="updateCrane(${craneData.id})" >Save</button>
            </td>
    </tr>
`;
}

function updateCrane(id) {
    let crane = document.querySelector(`.crane-${id}`);

    let craneObject = {
        id: id,
        crane: crane.querySelector('[name="crane"]').value,
        frequency: crane.querySelector('[name="frequency"]').value,
        downTime: crane.querySelector('[name="downTime"]').value,
        status: crane.querySelector('[name="status"]').value,
        timeToRepair: crane.querySelector('[name="timeToRepair"]').value,
        comment: crane.querySelector('[name="comment"]').value,
        actualState: crane.querySelector('[name="actualState"]').value
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
            const index = cranes.findIndex(crane => crane.id === id);
            cranes.splice(index, 1, data);


            crane.innerHTML = `
            <tr class="crane-${data.id} ${classTr}">
                <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${data.actualState == "To Do" ? "red" : data.actualState == "Solved" ? "green" : "yellow"}-600 text-gray-50">${data.crane}</span></td>
                <td ${classTd}>${data.frequency}</td>
                <td ${classTd}>${data.downTime}</td>
                <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${data.status == "Critical" ? "red" : data.status == "UnCritical" ? "green" : "yellow"}-600 text-gray-50">${data.status}</span></td>
                <td ${classTd}>${data.timeToRepair}</td>
                <td ${classTd}>${data.comment}</td>
                <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${data.actualState == "To Do" ? "red" : data.actualState == "Solved" ? "green" : "yellow"}-600 text-gray-50">${data.actualState}</span></td>
                <td ${classTd}>
                    <button class="px-3 py-1 font-semibold rounded-md bg-gray-600 text-gray-50 edit" onclick="editCrane(${data.id})" >Edit</button>
                    <button class="px-3 py-1 font-semibold rounded-md bg-gray-600 text-gray-50 delete" onclick="deleteCrane(${data.id})" >Delete</button>
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
        <tr class="crane-new ${classTr}">
            <td ${classTd}><input ${classInput} type='text' placeholder='crane' name='crane' value='' /></td>
            <td ${classTd}>
                <select ${classInput} name='frequency'>
                    <option value=" F < 2"> F < 2</option>
                    <option value="2 < F < 6">2 < F < 6</option>
                    <option value="F > 6">F > 6</option>
                </select>
            </td>            
            <td ${classTd}>
                <select ${classInput} name='downTime'>
                    <option value="BD (breakdown)">BD (breakdown)</option>
                    <option value="BD OOO (breakdown out of operation)">BD OOO (breakdown out of operation)</option>
                    <option value=" > 30 min"> > 30 min</option>
                    <option value=" > 10 min "> > 10 min </option>
                </select>
            </td>
            <td ${classTd}>
                <select ${classInput} name='status'>
                    <option value="UnCritical">UnCritical</option>
                    <option value="Tolerable">Tolerable</option>
                    <option value="Critical">Critical</option>
                </select>
            </td>
            <td ${classTd}>
                <select ${classInput} name='timeToRepair'>
                    <option value="  > 16h">  > 16h</option>
                    <option value="8 - 16h">8 - 16h</option>
                    <option value=" 2 - 8h "> 2 - 8h </option>
                    <option value=" 2 - 8h "> 2 - 8h </option>
                    <option value="0 - 2h">0 - 2h</option>
                </select>
            </td> 
            <td ${classTd}><input ${classInput} type='text' placeholder='comment' name='comment' value='' /></td>
            <td ${classTd}>
                <select ${classInput} name='actualState'>
                    <option value="Solved">Solved</option>
                    <option value="On Going">On Going</option>
                    <option value="To Do">To Do</option>
                </select>
            </td>            
            <td ${classTd}>
                <button class="px-3 py-1 font-semibold rounded-md bg-green-600 text-gray-50 save" onclick="saveCrane()" >Save</button>
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
        crane: crane.querySelector('[name="crane"]').value,
        frequency: crane.querySelector('[name="frequency"]').value,
        downTime: crane.querySelector('[name="downTime"]').value,
        status: crane.querySelector('[name="status"]').value,
        timeToRepair: crane.querySelector('[name="timeToRepair"]').value,
        comment: crane.querySelector('[name="comment"]').value,
        actualState: crane.querySelector('[name="actualState"]').value
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
            <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${data.actualState == "To Do" ? "red" : data.actualState == "Solved" ? "green" : "yellow"}-600 text-gray-50">${data.crane}</span></td>
            <td ${classTd}>${data.frequency}</td>
            <td ${classTd}>${data.downTime}</td>
            <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${data.status == "Critical" ? "red" : data.status == "UnCritical" ? "green" : "yellow"}-600 text-gray-50">${data.status}</span></td>
            <td ${classTd}>${data.timeToRepair}</td>
            <td ${classTd}>${data.comment}</td>
            <td ${classTd}><span class="p-1 font-semibold rounded-md bg-${data.actualState == "To Do" ? "red" : data.actualState == "Solved" ? "green" : "yellow"}-600 text-gray-50">${data.actualState}</span></td>
            <td ${classTd}>
                <button class="px-3 py-1 font-semibold rounded-md bg-gray-600 text-gray-50 edit" onclick="editCrane(${data.id})" >Edit</button>
                <button class="px-3 py-1 font-semibold rounded-md bg-gray-600 text-gray-50 delete" onclick="deleteCrane(${data.id})" >Delete</button>

            </td>
        </tr>
        `;

            isNewCrane = false;
        })
        .catch(error => console.error(error));

}

function deleteCrane(id) {
    confirm("Are you sure you want to delete the crane : " + cranes[cranes.findIndex(crane => crane.id === id)].crane + "?")
        ? fetch(url + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
                'Content-Type': 'application/json' // Set the content type of the request body
            }
        })
            .then(location.reload())
            // .then(data => location.reload())
            .catch(error => console.error(error))
        : null;
}