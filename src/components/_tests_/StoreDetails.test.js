import React from 'react';
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StoreDetails from './../StoreDetails';
import useStoreDetails from './../utils/useStoreDetails';

jest.mock('./../utils/useStoreDetails');

describe('displays store details for given store', () => {
    const details = {
        "uuid": "b3cf6cc7-a6bc-41b3-ac8a-017dde82013d",
        "name": "Haussmann Galeries Lafayette Menswear",
        "address_line1": "48 Boulevard Haussmann",
        "address_line2": null,
        "address_line3": null,
        "post_code": "75009",
        "phone_number": "+33 17 034 0245",
        "opening_hours": {
            "Monday": [{"open": "10:30", "close": "18:30"}],
            "Tuesday": [{"open": "9:30", "close": "19:30"}]
        }
    };

    afterEach(() => {
        cleanup();
        useStoreDetails.mockClear();
    });


    it('when data service is loading loading indicator is shown', () => {
        useStoreDetails.mockReturnValueOnce({
            loading: true
        });
        const {queryByTestId} = render(<StoreDetails/>);
        expect(queryByTestId('store-details-wrapper')).toBeInTheDocument();
        expect(queryByTestId('loading-status')).toBeInTheDocument();
        expect(queryByTestId('stores-details')).toBeNull();
    });

    it('when data is received store details is shown', () => {
        //shows opening hours if available

        useStoreDetails.mockReturnValueOnce({
            loading: false,
            details
        });
        const {queryByTestId} = render(<StoreDetails/>);
        expect(queryByTestId('store-details-wrapper')).toBeInTheDocument();
        expect(queryByTestId('loading-status')).toBeNull();
        expect(queryByTestId('stores-details')).toBeInTheDocument();
    });

    it('if data service returns error then error is shown', () => {
        useStoreDetails.mockReturnValueOnce({
            loading: false,
            error: 'No data found'
        });

        const {queryByTestId} = render(<StoreDetails/>);

        expect(queryByTestId('loading-status')).toBeNull();
        let errorDisplay = queryByTestId('error-display');
        expect(errorDisplay).toBeInTheDocument();
        expect(errorDisplay).toContainHTML('No data found');
    });
});
