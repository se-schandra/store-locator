Tech test

To start the application run npm install and then npm start

When the application starts up localhost:8080 will be loaded and HomePage will be displayed

I have implemented following functionalities:
- Home page to allow users to get stores for given country or city. By default no city is selected. and Get stores link will get stores for the selected country.
When a city is selected, get stores will get stores will get stores for that city.It uses 'useStoreLocationsListData' service to display the data on the page.

- Storeslist page displays list of stores for given city/country. For now the data service for stores list returns static data.

- Store details shows details of the store selected. For now it only displays store name and data service is returning static data 

This is an unfinished solution. Basic functionality in Home page and Store list has been covered but:
* there are still few error scenarios to covered such as by default first country in drop down is selected but user cannot select the city for country
* UI needs to improved
* data service for store list and store details is returning the static data. However should be a service similar to useStoreLocationsListData and can be easily extended
* Shops and shop details page is not yet fully implemented to show all required data
* functional tests are not yet implemented
# store-locator
# store-locator
