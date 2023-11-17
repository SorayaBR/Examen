const HPAPI_URL='https://wizard-world-api.herokuapp.com';

window.onload=async()=>{
    const wizards=await getAllWizards();

    const spinnerHtmlElement  = document.getElementById('spinner');
    spinnerHtmlElement.remove();

    for(const wizard of wizards){
        const mainHtmlElement = document.getElementById('main');
        const newElement = document.createElement('div');
        newElement.innerHTML=`<h2>${wizard.firstName}</h2>
        <p>${wizard.getElixirs()}</p>
        `
        mainHtmlElement.appendChild(newElement);
        for(const elixir of wizards){
            const mainHtmlElement2= document.getElementById('main');
            const newButton = document.createElement('button');
            newButton.innerText = wizard.getElixirs();
            newButton.addEventListener('click', () => showElixirsDetails(elixir, newButton));
            mainHtmlElement2.appendChild(newButton);
        }
    }
    
};
async function getAllWizards(){
    const response = await fetch(`${HPAPI_URL}/Wizards`);
    const data = await response.json();
    return data;
}
async function getElixirs(){
    const response = await fetch(`${HPAPI_URL}/elixirs`);
    const data = await response.json();
    return data;
}

function showElixirsDetails(elixir, button){
    const mainHtml = document.getElementById('main');
    const detailsId = `details-${elixir.name}`;
    const detailsHtml = document.getElementById(detailsId);
    if(!detailsHtml){
        const newDetails = document.createElement('div');
        newDetails.id=detailsId;
        newDetails.className='elixirs-details'
        newDetails.innerHTML = `
            <p>Ingredients: ${elixir.ingredients}</p>`;

            button.parentNode.insertBefore(newDetails, button.nextSibling);
    }else{
        detailsHtml.parentNode.removeChild(detailsHtml);
    }
}