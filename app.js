'use strict';
const rootURL = 'https://developer.nps.gov/api/v1/parks?'
const myAPI = 'n8HqTggp5FckAzPEjE1CRl6Tc5longlwqScWIj3Y'

function displayResults(responseJson){
    console.log(responseJson)
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3><a href=${responseJson.data[i].url}>${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      <h4>States: ${responseJson.data[i].states}</h4>
      </li>`
    )};
  $('#results').removeClass('hidden');
};


function getNationalParks(state1, state2, state3){
  const url = rootURL + 'stateCode=' + state1+ '&stateCode=' + state2 + '&stateCode=' + state3 + '&api_key='+myAPI;
  fetch(url)
  .then(response => {
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText)
  })
  .then(responseJson => displayResults(responseJson));
  //.catch(err => {
      //$('#js-error-message').text(`Something went wrong: ${(err.message)}`);
  //});
}


function watchForm(){
  $('#js-form').submit(event => {
    event.preventDefault();
    const state1 = $('#js-state1').val();
    const state2 = $('#js-state2').val();
    const state3 = $('#js-state3').val();
    getNationalParks(state1, state2, state3);
  });
}


$(function(){
  console.log('App loaded!');
  watchForm();
});