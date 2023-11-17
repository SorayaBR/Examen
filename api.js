const HPAPI_URL='https://wizard-world-api.herokuapp.com';

window.onload=async()=>{
    const wizards=await getAllWizards();
    const houses= await getAllHouses();
    
    const spinnerHtmlElement  = document.getElementById('spinner');
    spinnerHtmlElement.remove();

    for(const wizard of wizards){
        const mainHtmlElement = document.getElementById('main');
        const newElement = document.createElement('div');
        newElement.innerHTML=`<h2>${wizard.firstName}</h2>`;
        mainHtmlElement.appendChild(newElement);
        for(const elixir of wizard.elixirs){
            const newButton = document.createElement('button')
            newButton.innerText=elixir.name;
            newButton.addEventListener('click', () => showElixirIngredients(newButton, elixir.id));
            mainHtmlElement.appendChild(newButton);
        }
    }
    const table = document.createElement('table');
        for (let i = 0; i < houses.length; i += 2) {
            const fila = document.createElement('tr');
            for (let j = 0; j < 2 && i + j < houses.length; j++) {
                const index = i + j;
                const house = houses[index];
                const element = document.createElement('td');
                element.innerHTML = `<h2>${house.name}</h2>`;
                getImatgesHouses(house.name, element);
                fila.appendChild(element);
            }
            table.appendChild(fila);
        }
        document.getElementById('main').appendChild(table);
    
};
async function getAllWizards(){
    const response = await fetch(`${HPAPI_URL}/Wizards`);
    const data = await response.json();
    return data;
}
async function getElixir(elixirId){
    const response = await fetch(`${HPAPI_URL}/Elixirs/${elixirId}`);
    const data = await response.json();
    return data;
}
async function showElixirIngredients(button, elixirId){
    const elixir=await getElixir(elixirId);
    const mainHtmlElement = document.getElementById('main');
    const detailsId = `details-${elixirId.name}`;
    const detailsHtml = document.getElementById(detailsId);
    if(!detailsHtml){
        const newDetails = document.createElement('div');
        newDetails.id = detailsId;
        newDetails.className = 'elixirId-details';
        for (const ingredient of elixir.ingredients){
            newDetails.innerHTML +=`<p>${ingredient.name}</p>`;
            mainHtmlElement.appendChild(newDetails);
        }
        button.parentNode.insertBefore(newDetails, button.nextSibling);
    }else{
        detailsHtml.parentNode.removeChild(detailsHtml);
    }
}
async function getAllHouses(){
    const response = await fetch(`${HPAPI_URL}/Houses`);
    const data = await response.json();
    return data;
}
function getImatgesHouses(houseName, container) {
    const img = document.createElement('img');
    if (houseName === "Gryffindor") {
        img.classList.add('Gryffindor');
        img.src = 'https://1000marcas.net/wp-content/uploads/2021/11/Gryffindor-Logo-500x281.png';
    } else if (houseName === "Ravenclaw") {
        img.classList.add('Ravenclaw');
        img.src = 'https://freepngimg.com/convert-png/111661-house-ravenclaw-png-free-photo';
    } else if (houseName === "Hufflepuff") {
        img.classList.add('Hufflepuff');
        img.src = 'https://i.pinimg.com/originals/e0/e2/bc/e0e2bca469b63385d89ec2f1250e4ca5.png';
    } else if (houseName === "Slytherin") {
        img.classList.add('Slytherin');
        img.src = 'https://1000logos.net/wp-content/uploads/2023/05/Slytherin-Logo.png';
    }
    container.appendChild(img);
}
