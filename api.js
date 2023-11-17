const HPAPI_URL='https://wizard-world-api.herokuapp.com';
window.onload = async()=>{
    const characters= await getAllHPCharacters();
    const spinnerHtmlElement = document.getElementById('spinner');
    spinnerHtmlElement.remove();
    for(const character of characters){
        const mainHtmlElement=document.getElementById('main');
        const newElement = document.createElement('div');
        newElement.innerHTML=`<h2${character.name}</h2>`;
        mainHtmlElement.appendChild(newElement);
    }
};
async function getAllHPCharacters(){
    const response = await fetch(`${HPAPI_URL}/`)
}