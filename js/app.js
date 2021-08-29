let url ='https://coronavirus-19-api.herokuapp.com/countries/world';



const getSearchValue = () =>{
    document.getElementById('error').innerText='loading...';
    const searchFeild = document.getElementById('search-feild');
    searchText = searchFeild.value;
    searchFeild.value = '';
    if(searchText.length > 0){
        url = `https://coronavirus-19-api.herokuapp.com/countries/${searchText}`;
        fetch(url).then(res => res.json()).then(info => {
            document.getElementById('error').innerText='';
            console.log(info);
        }).catch(error =>{
            console.log(error);
            document.getElementById('error').innerText='This country not fount';
        })
    }else{
        // validation 
        document.getElementById('error').innerText='Please enter country name';
    }
    
}
const display = () =>{
    
}
const getCovidInfo = () => {
    document.getElementById('loader').innerText = 'loading ....'
    fetch('https://coronavirus-19-api.herokuapp.com/countries')
        .then(res => res.json())
        .then(info =>{ 
            document.getElementById('loader').innerText = ''
            displayCovidInfo(info);
        })
        .catch(error => console.log(error));
}

getCovidInfo();

const displayCovidInfo = (countries) => {
    const countryInfoContainer = document.getElementById('card-info');
    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add("card");
        div.innerHTML = `
       <h2>${country.country}</h2>
       <p>Cases: ${country.cases} | Today:${country.todayCases} | Deaths: ${country.deaths} | Today: ${country.todayDeaths} | Active: ${country.active} | Recovered: ${country.recovered} | Critical:${country.critical}
       </p>
       `;
        countryInfoContainer.appendChild(div);
        // console.log(country)
    });
}