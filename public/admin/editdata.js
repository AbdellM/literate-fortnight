const cranes = JSON.parse(localStorage.getItem('cranes'));
// const url = 'http://localhost:3000/cranes';
// console.log(cranes);
function editCrane(id) {
    let craneData = cranes.find(crane => crane.id == id);
    let crane = document.querySelector(`.crane-${id}`);
    crane.innerHTML = ` 
        <tr class="crane-${craneData.id}">
            <td><input type='text' for='name' value='${craneData.name}' /></td>
            <td><input type='text' for='capacity' value='${craneData.capacity}' /></td>
            <td><input type='text' for='type' value='${craneData.type}' /></td>
            <td><input type='text' for='location' value='${craneData.location}' /></td>
            <td>
                <button class="save" onclick="saveCrane(${craneData.id})" >Save</button>
            </td>
    </tr>
`;
}

function saveCrane(id) {

    // let craneData = cranes.find(crane => crane.id == id);
    let crane = document.querySelector(`.crane-${id}`);

    let craneObject = {
        id: id,
        name: crane.querySelector('[for="name"]').value,
        type: crane.querySelector('[for="type"]').value,
        capacity: crane.querySelector('[for="capacity"]').value,
        location: crane.querySelector('[for="location"]').value
    };

    //fetch(url, {  // Send a PUT request
    //     method: 'PUT',
    //     headers: {   // Set the proper Content-Type header

    // Update cranes with the new crane data
    // throw new Error('Network response was not ok');
    cranes[id - 1] = craneObject;
    localStorage.setItem("cranes", JSON.stringify(cranes));

    crane.innerHTML = `
    <tr class="crane-${craneObject.id}">
        <td>${craneObject.name}</td>
        <td>${craneObject.capacity}</td>
        <td>${craneObject.type}</td>
        <td>${craneObject.location}</td>
        <td>
            <button class="edit" onclick="editCrane(${craneObject.id})" >Edit</button>
        </td>
    </tr>
    `;
    console.log(craneObject);


    //     crane.innerHTML = ` 
    //         <tr class="crane-${craneData.id}">
    //             <td><input value='${craneData.name}' /></td>
    //             <td><input value='${craneData.capacity}' /></td>
    //             <td><input value='${craneData.type}' /></td>
    //             <td><input value='${craneData.location}' /></td>
    //             <td>
    //                 <button class="save" onclick="saveCrane(${craneData.id})" >Edit</button>
    //             </td>
    //     </tr>
    // `;
}