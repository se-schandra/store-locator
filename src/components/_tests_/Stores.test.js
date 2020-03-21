import React from 'react';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from "react-router-dom";
import useStoresListData from './../utils/useStoresListData';
import Stores from './../Stores'

jest.mock('./../utils/useStoresListData');
describe('displays list of stores for for given city', () => {

    const stores = [{
        "uuid": "b3cf6cc7-a6bc-41b3-ac8a-017dde82013d",
        "name": "Haussmann Galeries",
        "slug": "GaleriesLafayetteHaussmann",
        "city": "Paris",
        "country": "France",
        "city_slug": "paris",
        "country_slug": "france",
        "address_line1":"48 Boulevard Haussmann","address_line2":null,"address_line3":null,"post_code":"75009","phone_number":"+33 17 034 0245",
        "opening_hours_today": [{"open": null, "close": null}],
    }, {
        "uuid": "ce02df9f-689e-4116-ab57-5ab932366b53",
        "name": "Paris Le ",
        "slug": "paris-le",
        "city": "Paris",
        "address_line1":"23 Rue des Rosiers","address_line2":null,"address_line3":null,"post_code":"75004",
        "country": "France",
        "city_slug": "paris",
        "country_slug": "france",
        "opening_hours_today": [{"open": null, "close": null}],
    }]
    afterEach(() => {
        cleanup();
        useStoresListData.mockClear();
    });

    it('when data service is loading loading indicator is shown', () => {
        useStoresListData.mockReturnValueOnce({
            loading: true
        });
        const {queryByTestId} = render(<Stores/>);
        expect(queryByTestId('store-list-wrapper')).toBeInTheDocument();
        expect(queryByTestId('loading-status')).toBeInTheDocument();
        expect(queryByTestId('stores-list')).toBeNull();
    });

    it('when data is received store list and opening times is shown', () => {

        useStoresListData.mockReturnValueOnce({
            loading: false,
            stores
        });
        const {queryByTestId, getByTestId, debug} = render(<MemoryRouter><Stores/></MemoryRouter>);
        expect(queryByTestId('store-list-wrapper')).toBeInTheDocument();
        expect(queryByTestId('loading-status')).toBeNull();
        expect(queryByTestId('stores-list')).toBeInTheDocument();
        const store_row = document.querySelectorAll('.store-row');
        expect(store_row.length).toEqual(2);
        const firstRow = getByTestId('store-row-0')
        expect(firstRow).toHaveTextContent(`${stores[0].name} ${stores[0].address_line1} ${stores[0].phone_number} View details`);
    });


    it('if data service returns error then error is shown', () => {
        useStoresListData.mockReturnValueOnce({
            loading: false,
            error: 'No data found'
        });

        const {queryByTestId} = render(<Stores/>);

        expect(queryByTestId('loading-status')).toBeNull();
        let errorDisplay = queryByTestId('error-display');
        expect(errorDisplay).toBeInTheDocument();
        expect(errorDisplay).toContainHTML('No data found');
    });
});
