let url = 'https://coronavirus-19-api.herokuapp.com/countries/world';


const getSearchValue = () => {
    document.getElementById('error').innerText = 'loading...';
    const searchFeild = document.getElementById('search-feild');
    searchText = searchFeild.value;
    searchFeild.value = '';
    if (searchText.length > 0) {
        url = `https://coronavirus-19-api.herokuapp.com/countries/${searchText}`;
        fetch(url).then(res => res.json()).then(info => {
            document.getElementById('error').innerText = '';
            displaySearchInfo(info);
        }).catch(error => {
            console.log(error);
            document.getElementById('error').innerText = 'This country not fount';
        })
    } else {
        // validation 
        document.getElementById('error').innerText = 'Please enter country name';
    }
}




const displaySearchInfo = (country) => {
    displayCountryDetails(country);
    const countryInfoContainer = document.getElementById('search-info');
    countryInfoContainer.textContent = "";
    const div = document.createElement('div');
    div.classList.add("card");
    div.innerHTML = `
       <h2>${country.country}</h2>
       <p>Cases: ${country.cases} | Today:${country.todayCases} | Deaths: ${country.deaths} | Today: ${country.todayDeaths} | Active: ${country.active} | Recovered: ${country.recovered} | Critical:${country.critical}
       </p>
       `;
    countryInfoContainer.appendChild(div);
}

// get all countries data 
const getCovidInfo = () => {
    document.getElementById('loader').innerText = 'loading ....'
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
        .then(res => res.json())
        .then(info => {
            document.getElementById('loader').innerText = ''
            displayCovidInfo(info);
        })
        .catch(error => console.log(error));
}

getCovidInfo();

// world info display 
const displayCovidInfo = (countries) => {
    const countriesInfoContainer = document.getElementById('card-info');
    // display world 
    displayCountryDetails(countries[0]);

    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add("card");
        div.setAttribute("onclick", `displayCountryDetails('${country.country}')`)
        div.innerHTML = `
       <h2>${country.country}</h2>
       <p>Cases: ${country.cases} | Today:${country.todayCases} | Deaths: ${country.deaths} | Today: ${country.todayDeaths} | Active: ${country.active} | Recovered: ${country.recovered} | Critical:${country.critical}
       </p>
       `;
        countriesInfoContainer.appendChild(div);
        // console.log(country)
    });
}


const getCountryDetails = (countryName) => {
    // document.getElementById('error').innerText = 'loading...';
    // console.log("getCountryDetails: ", countryName);
    url = `https://coronavirus-19-api.herokuapp.com/countries/${countryName}`;
    fetch(url).then(res => res.json()).then(info => {
        // document.getElementById('error').innerText = '';
        displayCountryDetails(info);
    }).catch(error => {
        console.log(error);
        document.getElementById('error').innerText = 'This country not fount';
        document.getElementById('country-loader').innerText = 'This country not fount';
    })
}

function display(idName, value) {
    const countryTitle = document.getElementById(idName);
    countryTitle.innerText = value;
}
// display details 
const displayCountryDetails = (country) => {

    if (typeof (country) != 'object') {
        getCountryDetails(country);
    } else {
        display('country-title', country.country)
        display('country-title1', country.country)

        document.getElementById('country-details').innerHTML = `
        <div>
            <h3>Total  case:  ${country.cases}</h3>
            <h3>Total Death :  ${country.deaths}  </h3>
            <h3>Total Recovered: ${country.recovered}</h3>
        </div>
        <div>
            <h3>Today case : ${country.todayCases}</h3>
            <h3> Today Deaths: ${country.todayDeaths}</h3>
            <h3>Critical: ${country.critical}</h3>
        </div>
        `;

        console.log(country);
    }
    //
}