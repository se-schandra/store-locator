import {useEffect, useState} from 'react';
// export const SHOP_DEATILS_BY_UUID = `https://store-locator-api.allsaints.com/shops/${uuid}`;
export default () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [details, setDeatils] = useState({
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
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    return {loading, details, error}
}
