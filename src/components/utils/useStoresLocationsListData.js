import {useEffect, useState} from 'react';
import axios from 'axios';

const LOCATIONS_URL = 'https://store-locator-api.allsaints.com/locations';

const fetchData = async (url) => {
    return await axios.get(url);
};

export default () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [shopsLink, setShopsLink] = useState();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    //on load get countries
    useEffect(() => {
        fetchData(LOCATIONS_URL)
            .then(response => {
                const countries = response.data;
                setCountries(countries);
                setShopsLink(`/shops?country=${countries[0].slug}`);
                setLoading(false);
            }).
        catch(e => {
            setLoading(false);
            setError(e.message);
        });
    }, []);

    //get cities for given country
    const fetchCities = (country) => {
        setShopsLink(`/shops?country=${country}`);
        fetchData(`${LOCATIONS_URL}/${country}`)
            .then(response => {
                const cities = response.data.cities;
                setCities(cities);
            }).
        catch(e => {
            setError(e.message);
        });
    }

    //update shop link if a city is selected
    const updateCityLink = (city) =>{
        if(city.length){
            setShopsLink(`/shops?city=${city}`);
        }
    }

    return {loading, countries, cities, error, fetchCities, updateCityLink, shopsLink}
}
