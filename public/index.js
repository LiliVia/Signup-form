const API_URL = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;

const today = () => {
  let day = document.getElementById('date');

  let date = new Date();

  let dd = date.getDate();
  dd = dd < 10 ? `0${dd}` : dd;

  let mm = date.getMonth();
  mm = mm < 10 ? `:0${mm}` : `:${mm}`;

  let year = date.getFullYear();
  year = `:${year}`
  day.innerHTML = `${dd}${mm}${year}`
}

const renderData = dataArr => {
  const tr = dataArr.map(data => {
    return `
            <td>${parseFloat(data.sale).toFixed(2)} ${data.base_ccy}</td>
          `;
  }).join('');

  const host = document.getElementById('currency');
  today();
  host.innerHTML = `
           <table id="cash">
              <tr>
              <th>USD</th>
              <th>EUR</th>
              <th>RUR</th>
              <th>BTC</th>
              </tr>
              <tr>
                ${tr}
              </tr>
          </table>
      `;
}

const apiCall = (url) => (
  fetch(url).then(res => res.json())
    .then(data => {
      renderData(data)
      // console.log('parsed json', data)
    })
    .catch(er => console.log('parsing failed', er))
);

apiCall(API_URL);

const form = document.getElementById('signup');

const registerUser = () => {
  const url = '/auth';
  const data = {
    name: document.getElementsByName("name")[0].value,
    email: document.getElementsByName("email")[0].value,
    password: document.getElementsByName("password")[0].value
  };
  const params = {
    headers: {
      "content-type": "application/json"
    },
    body: data,
    method: "POST"
  }

  fetch(url, params).then(res => res.text())
    .then(data => {
      console.log('new user', data)
    })
    .catch(er => console.log('server error', er));
};

form.addEventListener('submit', e => {
  e.preventDefault();
  registerUser();
});
