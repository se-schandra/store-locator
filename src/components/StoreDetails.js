import React from "react";
import useStoreDetails from './utils/useStoreDetails';

export default () => {
    const {loading, details = {}, error} = useStoreDetails();

    return (
        <div data-testid='store-details-wrapper'>
            {loading && <div data-testid='loading-status'>Loading...</div>}
            {Object.keys(details).length ? (
                <div data-testid='stores-details'>
                    <h4>Store details</h4>
                    <p>
                        {details.name}
                    </p>
                </div>
            ) : null}
            {error && <span data-testid='error-display'>{error}</span>}
        </div>
    );
}
