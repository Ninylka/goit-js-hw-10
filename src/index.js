import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from './js/cat-api'
import SlimSelect from 'slim-select'
import refs from "./js/refs";
const {selectForm, catInfo, loadPage, errorPage} = refs
import '../node_modules/slim-select/dist/slimselect.css'
import { Report } from 'notiflix/build/notiflix-report-aio';
axios.defaults.baseURL = 'https://api.thecatapi.com';
axios.defaults.headers.common["x-api-key"] = "live_HRLKeHRn5AgfTHIDeC01DhGb59xBBPtTshRd6I6QrmcgcRCDrvEgWQZUDOd25MgY";


loadPage.textContent = '';
// loadPage.classList.add('loader-hidden');
errorPage.textContent = '';


fetchBreeds()
  .then(breedsCats => {
    const allNameCats = breedsCats.map(({ id, name }) => {
      return { value: id, text: name };
    });

    allNameCats.unshift({
      value: '',
      text: 'Select breed',
      disabled: true,
    });
    
    new SlimSelect({
      select: selectForm,
      data: allNameCats,
    });
    
  })
  .catch(onFetchError);



selectForm.addEventListener('change', onSelectChange) ;
function onSelectChange(event) {

  const breedId = event.target.value
    
    
    if (breedId === '') {
        return;
      }
      loadPage.classList.remove('loader-hidden');

      catInfo.innerHTML = '';
 
fetchCatByBreed(breedId)
.then(res => {
  if (res && res.breeds && res.breeds.length > 0) {
    createMarkupCardCat(res);
  } else {
    onFetchError();
  }
})
.catch(onFetchError);


    }



function  createMarkupCardCat (cardcat) {

const { name, temperament, description } = cardcat.breeds[0];
  
catInfo.insertAdjacentHTML('beforeend', `<div class="cat-info">
<img src="${cardcat.url}" alt="${name}" width="650" heigth="350">
<h2  >${name}</h2>
<p class="cat-breed-desc">${description}</p>
<p><b ">Temperament: </b>${temperament}</p></div>
`);
loadPage.classList.add('loader-hidden');
}

 
 
    function onFetchError() {
        catInfo.innerHTML = '';
       loadPage.classList.add('loader-hidden');
       Report.failure(
          'Error',
          'Oops! Something went wrong! Try reloading the page!',
          'OK'
        );
      }









