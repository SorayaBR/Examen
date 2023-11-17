const HPAPI_URL='https://wizard-world-api.herokuapp.com';

window.onload=async()=>{
    const wizards=await getAllWizards();

    const spinnerHtmlElement  = document.getElementById('spinner');
    spinnerHtmlElement.remove();

    for(const wizard of wizards){
        const mainHtmlElement = document.getElementById('main');
        const newElement = document.createElement('div');
        newElement.innerHTML=`<h2>${wizard.firstName}</h2>
        `
        mainHtmlElement.appendChild(newElement);
    }
    const elixirs= await getAllElixirs();
    for(const elixir of elixirs){
        const mainHtmlElement2 = document.getElementById('main');
        const newElement2 = document.createElement('div');
        newButton.innerText = elixir.name;
        newButton.addEventListener('click', () => showElixirsDetails(elixir, newButton));
        mainHtml.appendChild(newButton);
    }
    
};
async function getAllWizards(){
    const response = await fetch(`${HPAPI_URL}/Wizards`);
    const data = await response.json();
    debugger;
    return data;
}
async function getAllElixirs(){
    const response = await fetch(`${HPAPI_URL}/Elixirs`);
    const data = await response.json();
    return data;
}
async function showElixirsDetails(elixir, button){
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