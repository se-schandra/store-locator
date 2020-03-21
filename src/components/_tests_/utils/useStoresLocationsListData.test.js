import React from "react";
import {cleanup, fireEvent, render} from '@testing-library/react';
import {act,renderHook} from "@testing-library/react-hooks";
import '@testing-library/jest-dom/extend-expect'
import useStoresLocationsListData from './../../utils/useStoresLocationsListData';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const LOCATIONS_URL = 'https://store-locator-api.allsaints.com/locations';

describe('it get data for the store location page',()=>{

    afterEach(()=>{
        cleanup();
        jest.clearAllMocks()
    })

    it('gets countries on on load', async ()=>{

        const response = [
            {
                name:'france',
                slug:'france_slug'
            }
        ];
        mock.onGet(LOCATIONS_URL).replyOnce(200, response);

        let hook;

        act(()=>{
            hook= renderHook(()=> useStoresLocationsListData());
        });


        const {result,waitForNextUpdate} = hook;
        expect(result.current.countries).toEqual([]);
        expect(result.current.error).toEqual(undefined);
        expect(result.current.loading).toEqual(true);

        await waitForNextUpdate();


        const data = result.current.countries;
        expect(data.length).toEqual(1);
        expect(data[0].name).toEqual(response[0].name);
        expect(data[0].slug).toEqual(response[0].slug);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual(undefined);
        const shopsLink = result.current.shopsLink;
        expect(shopsLink).toEqual('/shops?country=france_slug');

    });

    it('makes a request for given url and returns error for unsuccessful request', async () => {
        mock.onGet(LOCATIONS_URL).networkErrorOnce();
        let hook;
        act(() => {
            hook = renderHook(() => useStoresLocationsListData());
        });
        const {result, waitForNextUpdate} = hook;
        expect(result.current.countries).toEqual([]);
        expect(result.current.error).toEqual(undefined);
        expect(result.current.loading).toEqual(true);


        await waitForNextUpdate();
        const data = result.current.countries;
        expect(data.length).toEqual(0);
        expect(result.current.loading).toEqual(false);
        expect(result.current.error).toEqual("Network Error");
    });

    it('fetch cities get cities ', async ()=>{

        const response = [
            {
                name:'france',
                slug:'france_slug'
            }
        ];
        mock.onGet(LOCATIONS_URL).replyOnce(200, response);

        const city_response = {
            cities:[
                {
                    name:'paris',
                    slug:'paris_slug'
                }
            ]
        };
        mock.onGet(`${LOCATIONS_URL}/france`).replyOnce(200, city_response);
        let hook;

        act(()=>{
            hook= renderHook(()=> useStoresLocationsListData());
        });

        const {result,waitForNextUpdate} = hook;
        await waitForNextUpdate();

        const data = result.current.countries;
        expect(data.length).toEqual(1);
        act(()=>{
            result.current.fetchCities('france');
        });
        await waitForNextUpdate();
        const cities_data = result.current.cities;
        expect(cities_data.length).toEqual(1);
        const shopsLink = result.current.shopsLink;
        expect(shopsLink).toEqual('/shops?country=france');

    });

    it('updateCityLink updates the shop link ', async ()=>{

        let hook;

        act(()=>{
            hook= renderHook(()=> useStoresLocationsListData());
        });

        const {result,waitForNextUpdate} = hook;
        act(()=>{
            result.current.updateCityLink('paris');
        });

        await waitForNextUpdate();
        const shopsLink = result.current.shopsLink;
        expect(shopsLink).toEqual('/shops?city=paris');

    });
});
