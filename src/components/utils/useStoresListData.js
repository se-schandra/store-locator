import {useEffect, useState} from 'react';

// export const SHOPS_LIST_BY_COUNTRY = `https://store-locator-api.allsaints.com/shops?country=${country}`;
// export const SHOPS_LIST_BY_CITIES = `https://store-locator-api.allsaints.com/shops?city=${city}`;
export default () => {
    const [loading, setLoading] = useState(true);
    const [stores, setStores] = useState([{
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
    }]);
    const [error, seroor] = useState();

    useEffect(() => {
        setLoading(false);
    }, []);

    return {loading, stores, error}
}
