const HPAPI_URL='https://wizard-world-api.herokuapp.com';

window.onload=async()=>{
    const wizards=await getAllWizards();
    const elixirs=await getAllElixirs();

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
            newButton.addEventListener('click', () => showElixirIngredients(elixir, newButton));
            mainHtmlElement.appendChild(newButton);
        }
    }
    
};
async function getAllWizards(){
    const response = await fetch(`${HPAPI_URL}/Wizards`);
    const data = await response.json();
    return data;
}
async function getAllElixirs(){
    const response = await fetch(`${HPAPI_URL}/Elixirs`);
    const data = await response.json();
    return data;
}
function showElixirIngredients(wizard, elixir, button){
    const mainHtml = document.getElementById('main');
    const detailsId = `details-${elixir.name}`;
    const detailsHtml = document.getElementById(detailsId);

    if (!detailsHtml) {
        // Si no existe, crea un nuevo elemento details
        const newDetails = document.createElement('div');
        newDetails.id = detailsId;
        newDetails.className = 'elixirs-details';
        for (const ingredient of elixirs){
            newDetails.innerHTML +=`<p>${ingredient.ingredients}</p>`;
        }

        // Agrega el nuevo elemento details debajo del botón
        button.parentNode.insertBefore(newDetails, button.nextSibling);
    } else {
        // Si ya existe, elimina el elemento details
        detailsHtml.parentNode.removeChild(detailsHtml);
    }
}
