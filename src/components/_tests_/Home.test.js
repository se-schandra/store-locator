import React from 'react';
import {cleanup, fireEvent, render, act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import useStoresLocationsListData from './../utils/useStoresLocationsListData';
import Home from './../Home';

jest.mock('./../utils/useStoresLocationsListData');

describe('Home page allows to search for stores', () => {

    //setup
    const countries = [
        {"country": "Belgium", "slug": "belgium"},
        {"country": "Canada", "slug": "canada"},
        {"country": "Chile", "slug": "chile"}
    ];

    const cities = [{"name": "Paris", "slug": "paris"}, {"name": "ParisA", "slug": "parisA"}];

    const fetchCities = jest.fn().mockImplementation((value) => {
        return [
            {
                city: `${value}-city-name1`,
                slug: `${value}-city-slug1`,
            }, {
                city: `${value}-city-name2`,
                slug: `${value}-city-slug2`,
            }
        ]
    });

    const updateCityLink = jest.fn().mockImplementation((value) => {});

    afterEach(() => {
        cleanup();
        useStoresLocationsListData.mockClear();
    });


    it('shows loading indicator if data is loading', () => {
        useStoresLocationsListData.mockReturnValueOnce({
            loading: true
        });
        let component;
        act(()=>{
            component = render(<Home/>)
        })
        const {queryByTestId} = component;
        expect(queryByTestId('home-page-wrapper')).toBeInTheDocument();
        expect(queryByTestId('loading-status')).toBeInTheDocument();
        expect(queryByTestId('stores-location-list-wrapper')).toBeNull();

    });

    it('shows countires list if dataservice returns countries list', () => {
        const shopsLink = `/shops?country=${countries[0].slug}`;

        useStoresLocationsListData.mockReturnValueOnce({
            loading: false,
            countries,
            shopsLink
        });

        const {queryByTestId} = render(<MemoryRouter><Home/></MemoryRouter>);
        expect(queryByTestId('loading-status')).toBeNull();
        expect(queryByTestId('stores-location-list-wrapper')).toBeInTheDocument();
        const countriesList = queryByTestId('countries-list');
        expect(countriesList).toBeInTheDocument();

        const countryOptions = countriesList.getElementsByTagName('option');
        expect(countryOptions.length).toEqual(countries.length);

        expect(queryByTestId('cities-list')).toBeDisabled('disabled');

        const getStoresLink = queryByTestId('get-stores-link');
        expect(getStoresLink).toBeEnabled();
        expect(getStoresLink).toHaveAttribute('href', shopsLink);


    });

    it('shows error if dataservice returns error', () => {

        useStoresLocationsListData.mockReturnValueOnce({
            loading: false,
            error: 'No data found'
        });

        const {queryByTestId} = render(<Home/>);

        expect(queryByTestId('loading-status')).toBeNull();
        expect(queryByTestId('stores-location-list-wrapper')).toBeNull();
        let errorDisplay = queryByTestId('error-display');
        expect(errorDisplay).toBeInTheDocument();
        expect(errorDisplay).toContainHTML('No data found');
    });

    it('calls fetchCities when a country is a selected', async () => {
        const result = {
            countries,
            loading: false,
            fetchCities
        };

        useStoresLocationsListData.mockReturnValueOnce(result);
        const {queryByTestId, debug} = render(<MemoryRouter><Home/></MemoryRouter>);
        const countriesList = queryByTestId('countries-list');
        let citiesList = queryByTestId('cities-list');
        expect(citiesList).toBeDisabled();
        fireEvent.change(countriesList, {"target": {value: "canada"}});
        expect(fetchCities).toHaveBeenCalledTimes(1);
        expect(fetchCities).toHaveBeenCalledWith("canada");

    });

    it('if cities is then cities list is enabled and no city is selected', async () => {
        const shopsLink = `/shops?country=${countries[0].slug}`;

        const result = {
            countries,
            shopsLink,
            loading: false,
            cities
        };

        useStoresLocationsListData.mockReturnValueOnce(result);
        const {queryByTestId, debug} = render(<MemoryRouter><Home/></MemoryRouter>);
        const countriesList = queryByTestId('countries-list');
        const citiesList = queryByTestId('cities-list');
        expect(citiesList).toBeEnabled();
        const citiesOptions = citiesList.getElementsByTagName('option');
        expect(citiesOptions.length).toEqual(cities.length+1);
        const getStoresLink = queryByTestId('get-stores-link');
        expect(getStoresLink).toBeEnabled();
        expect(citiesList).toHaveValue('')
        expect(getStoresLink).toHaveAttribute('href', `/shops?country=${countries[0].slug}`);
    });

    it('when a city is selected dataservice function "updateCityLink" is called',()=>{

        const result = {
            countries,
            loading: false,
            cities,
            updateCityLink
        };

        useStoresLocationsListData.mockReturnValueOnce(result);
        const {queryByTestId} = render(<MemoryRouter><Home/></MemoryRouter>);
        const citiesList = queryByTestId('cities-list');
        fireEvent.change(citiesList, {"target": {value: "paris"}});
        expect(updateCityLink).toHaveBeenCalledTimes(1);
        expect(updateCityLink).toHaveBeenCalledWith("paris");
    })

});
