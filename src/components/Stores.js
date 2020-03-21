import React from "react";
import {Link} from 'react-router-dom';
import useStoresListData from './utils/useStoresListData';

/**
 * Shows user list of stores for selected country or city
 * For each store store name, address, phone number (if present) and link to store details is shown
 */
export default () => {
    const {loading, stores = [], error} = useStoresListData(window.location.href);
    const placename = location.href.indexOf('=') > -1? `${location.href.split('=')[1]}`:null;
    return (
        <div data-testid='store-list-wrapper'>
            {loading && <div data-testid='loading-status'>Loading...</div>}
            {
                stores.length ?
                    (
                        <div data-testid='stores-list'>
                            <h4> Store list {placename && <span>for <span className='placename'>{placename}</span></span>}</h4>
                            <table>
                                <thead>
                                <tr>
                                    <th>Store Name</th>
                                    <th>Address</th>
                                    <th>Store details</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    stores.map(
                                        ({name, address_line1, address_line2 = '', address_line3 = '', postcode, phone_number, uuid}, index) => {
                                            return (
                                                <tr key={index} data-testid={`store-row-${index}`} className='store-row'>
                                                    <td>{name}</td>
                                                    <td>
                                                        <address> {address_line1} {address_line2}{address_line3} {postcode}</address>
                                                        {phone_number && <em>{phone_number} </em>}
                                                    </td>
                                                    <td><Link to={`/shops/${uuid}`}>View details</Link></td>
                                                </tr>

                                            );
                                        })
                                }
                                </tbody>
                            </table>
                        </div>
                    )

                    : null
            }
            {error && <span data-testid='error-display'>{error}</span>}
        </div>
    );
}
