const API_URL = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`;

const today = () => {
  let day, date, dd, mm, year;
  day = document.getElementById('date');
  date = new Date();
  dd = date.getDate();
  dd = dd < 10 ? `0${dd}` : dd;
  mm = date.getMonth();
  mm = mm < 10 ? `/0${mm}` : `:${mm}`;
  year = date.getFullYear();
  year = `/${year}`
  day.innerHTML = `${dd}${mm}${year}`
}

const renderData = dataArr => {

  const tr = dataArr.map(data => {
    return `
          <tr>
            <td>1 ${data.ccy}</td>
            <td>${parseFloat(data.buy).toFixed(2)} ${data.base_ccy}</td>
            <td>${parseFloat(data.sale).toFixed(2)} ${data.base_ccy}</td>
          </tr>
          `;
  }).join('');

  const host = document.getElementById('currency');
  today();
  host.innerHTML = `
      <table id="cash">
        <tr>
          <th>Currency</th>
          <th>Buy</th>
          <th>Sale</th>
        </tr>
          ${tr}
      </table>
      `;
}

const apiCall = (url) => (
  fetch(url).then(res => res.json())
    .then(data => {
      renderData(data)
    })
    .catch(er => console.log('parsing failed', er))
);

apiCall(API_URL);

const form = document.getElementById('login-form');

const loginUser = () => {
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
    .then(console.log('logged user'))
    .catch(er => console.log('server error', er));
};

form.addEventListener('submit', e => {
  e.preventDefault();
  loginUser();
  form.reset();
});
