const HPAPI_URL='https://wizard-world-api.herokuapp.com';

let destacarCasa;

window.onload=async()=>{
    const wizards=await getAllWizards();
    const houses= await getAllHouses();
    
    const spinnerHtmlElement  = document.getElementById('spinner');
    spinnerHtmlElement.remove();
    //Personas y elixires
    const headerHtmlElement = document.getElementById('header');
    const logo = document.createElement('div');
    logo.id = 'logo';
    const img = document.createElement('img');
    img.src = 'https://www.linformaldesign.com/shop/wp-content/uploads/2021/03/harry-potter-logo-300x125.png';
    logo.appendChild(img);
    headerHtmlElement.appendChild(logo);

    const mainHtmlElement = document.getElementById('main');
    for(const wizard of wizards){
        const newElement = document.createElement('div');
        newElement.classList.add('Wizards');

        const nameCont = document.createElement('div');
        nameCont.classList.add('nameCont');
        nameCont.innerHTML = `<h2>${wizard.firstName}</h2>`;

        const newButtonDestPers = document.createElement('button');
        newButtonDestPers.classList.add('buttonDestPers');
        newButtonDestPers.innerHTML = "Destacar";
        newButtonDestPers.addEventListener('click', () => mostraElementFlotantPers(wizard.firstName));
       
        nameCont.appendChild(newButtonDestPers);
        newElement.appendChild(nameCont);
        mainHtmlElement.appendChild(newElement)

        for(const elixir of wizard.elixirs){
            const newButton = document.createElement('button')
            newButton.classList.add('buttonElixirs');
            newButton.innerText=elixir.name;
            newButton.addEventListener('click', () => showElixirIngredients(newButton, elixir.id));
            mainHtmlElement.appendChild(newButton);
        }
    }
    //Destacar personaje que elige el usuario
    destacarPersona=document.createElement('div');
    document.body.appendChild(destacarPersona);
    //tabla para las casas 
    const table = document.createElement('table');
        for (let i = 0; i < houses.length; i += 2) {
            const fila = document.createElement('tr'); //fila
            for (let j = 0; j < 2 && i + j < houses.length; j++) {
                const index = i + j;
                const house = houses[index];
                const element = document.createElement('td'); //columna
                element.innerHTML = `<h2>${house.name}</h2>`;
                getImatgesHouses(house.name, element);
                fila.appendChild(element);
            }
            table.appendChild(fila);
        }
    document.getElementById('main').appendChild(table);
    //Destacar la casa que elige el usuario
    destacarCasa=document.createElement('div');
    document.body.appendChild(destacarCasa);
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
    const detailsId = `details-${elixirId}`;
    let detailsHtml = document.getElementById(detailsId);
    if(!detailsHtml){
        detailsHtml=document.createElement('div');
        detailsHtml.id=detailsId;
        mainHtmlElement.appendChild(detailsHtml);
        for (const ingredient of elixir.ingredients){
            detailsHtml.innerHTML +=`<p>${ingredient.name}</p>`;
        }
        button.parentNode.insertBefore(detailsHtml, button.nextSibling);
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
    const houseContainer = document.createElement('div');
    houseContainer.classList.add('houseContainer');
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
    const newButtonDestCasa = document.createElement('button');
    newButtonDestCasa.classList.add('buttonDestCasa');
    newButtonDestCasa.innerHTML = "Destacar";
    newButtonDestCasa.addEventListener('click', () => mostraElementFlotant(houseName));

    houseContainer.appendChild(img);
    houseContainer.appendChild(newButtonDestCasa);
    container.appendChild(houseContainer);
}
function mostraElementFlotantPers(wizardName){
    while (destacarPersona.firstChild){
        destacarPersona.removeChild(destacarPersona.firstChild);
    }
    const destacarElement = document.createElement('div');
    if (wizardName !== null) {
        destacarElement.innerText="Personaje favorito: "+wizardName;
        destacarElement.classList.add('destacarPersona');
    } else {
        destacarElement.innerText="Ningun personaje destacado";
        destacarElement.classList.add('destacarPersona');
    }
    destacarPersona.appendChild(destacarElement);
}
function mostraElementFlotant(houseName){ //funcion para los botones de destacar casa
    while (destacarCasa.firstChild){
        destacarCasa.removeChild(destacarCasa.firstChild);
    }

    const destacarElement = document.createElement('div');
    if (houseName === "Gryffindor") {
        destacarElement.innerText="Soy de la casa: Gryffindor"
        destacarElement.classList.add('destacarGryffindor');
    } else if (houseName === "Ravenclaw") {
        destacarElement.innerText="Soy de la casa: Ravenclaw"
        destacarElement.classList.add('destacarRavenclaw');
    } else if (houseName === "Hufflepuff") {
        destacarElement.innerText="Soy de la casa: Hufflepuff"
        destacarElement.classList.add('destacarHufflepuff');
    } else if (houseName === "Slytherin") {
        destacarElement.innerText="Soy de la casa: Slytherin"
        destacarElement.classList.add('destacarSlytherin');
    }
    destacarCasa.appendChild(destacarElement);
}
