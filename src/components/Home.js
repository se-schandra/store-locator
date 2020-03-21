import React from "react";
import {Link} from 'react-router-dom';
import useStoresLocationsListData from './utils/useStoresLocationsListData';

/**
 * Store locator homepage to allow users to serach stores in given country and places
 * Calls useStoresLocationsListData to get all the data to be displayed on view
 * By defalut no city is sleected and getStores link will get stores for selected country
 * If a city is selected the get stores link will get stores for that city
 */
export default () => {

    const {loading, countries = [], cities = [], error, fetchCities, shopsLink='', updateCityLink} = useStoresLocationsListData();

    const getCities = (e) => {
        const value = e.target.value;
        fetchCities(value);
    };

    const setCity = (e) => {
        const value = e.target.value;
        updateCityLink(value);
    };

    return (
        <div data-testid='home-page-wrapper'>
            {loading && <div data-testid='loading-status'>Loading...</div>}
            {countries.length ? (
                <React.Fragment>
                    <h4>Find stores by country and cities</h4>
                    <fieldset data-testid='stores-location-list-wrapper'>

                        <label>Country</label>
                        <select data-testid='countries-list' onChange={getCities}>
                            {
                                countries.map(aCountry => <option key={aCountry.slug}
                                                                  value={aCountry.slug}>{aCountry.country}</option>)
                            }
                        </select>

                        <label>Cities</label>
                        <select disabled={!cities.length} data-testid="cities-list" onChange={setCity}>
                            <option value=''>Select a city...</option>
                            {cities.map(aCity => <option key={aCity.slug}
                                                         value={aCity.slug}>{aCity.name}</option>)}</select>

                        <Link to={shopsLink} data-testid='get-stores-link'>Get Stores</Link>
                    </fieldset>
                </React.Fragment>

            ) : null}
            {error && <span data-testid='error-display'>{error}</span>}
        </div>
    );


}
