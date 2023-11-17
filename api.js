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
        newElement2.innerHTML=`<p>${elixir.name}</p>
        `
        mainHtmlElement2.appendChild(newElement2);
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