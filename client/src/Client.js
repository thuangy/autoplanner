/* eslint-disable no-undef */
function search(query, cb) {
  const yelp = require('yelp-fusion');
  const token = "RriuQzV7BJO0nxQO94HtsH-q20X2nzdCo4HXkzG7SjiyRQ9oKd7ljfBgFvVTWAyzUet-P4ddm27AyOgw-4nrCPfsAu6jkTiO57PKyy9C5Reh4OsCbT7WulvB-dJHWXYx";
  const client = yelp.client(token);

  return client.search({
    term: 'restaurants',
    location: 'boulder'
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name);
  }).catch(e => {
    console.log(e);
  });

  // return fetch(`api/food?q=${query}`, {
  //   accept: 'application/json',
  // }).then(checkStatus)
  //   .then(parseJSON)
  //   .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search };
export default Client;
