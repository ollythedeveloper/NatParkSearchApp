'use strict';
const rootURL = 'https://developer.nps.gov/api/v1/parks?'
const myAPI = 'n8HqTggp5FckAzPEjE1CRl6Tc5longlwqScWIj3Y'

function formatQuearyParams(params){
  const queryItems = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson){
    //console.log(responseJson)
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li><h3><a href=${responseJson.data[i].url}>${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};


function getNationalParks(states, maxResults){
  const params= {
    stateCode: states,
    limit: maxResults,
    api_key: myAPI
  };
  const queryString = formatQuearyParams(params)
  const url = rootURL + queryString;

  console.log(url);

  fetch(url)
  .then(response => {
    if(response.ok){
      return response.json();
    }
    throw new Error(response.statusText)
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
     $('#js-error-message').text(`Something went wrong: ${(err.message)}`);
  });
}


function watchForm(){
  $('#js-form').submit(event => {
    event.preventDefault();
    const states = $('#js-states').val();
    const maxResults = $('#js-max-results').val();
    getNationalParks(states, maxResults);
  });
}


$(function(){
  console.log('App loaded!');
  watchForm();
});