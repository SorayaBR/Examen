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
    for(const house of houses){
        const mainHtmlElement2 = document.getElementById('main');
        const newElement2 = document.createElement('div');
        newElement2.innerHTML=`<h2>${house.name}</h2>`;
        mainHtmlElement2.appendChild(newElement2);
    }
    
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
