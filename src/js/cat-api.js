import axios from "axios";


function fetchBreeds() {
  return axios
  .get(`/v1/breeds`)
  .then(response =>{
      return response.data;
  })
  .catch(error =>{
      return new Error('Oops! Something went wrong! Try reloading the page!')
  })
}


function fetchCatByBreed(breedId) {
  return axios
  .get(`/v1/images/search?breed_ids=${breedId}`)
  .then(response =>{
      return response.data[0];

  })
  .catch(error =>{
      return new Error('Oops! Something went wrong! Try reloading the page!')
  })
}
export { fetchBreeds, fetchCatByBreed } ;
