import React from "react";
import {cleanup, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './../App';
import Home from './../Home';
jest.mock('./../Home');

describe('App laysout without crash', () => {
    afterEach(() => {
        cleanup();
    });
    it('App has header and displays home page',() => {
        Home.mockReturnValueOnce(<div data-testid="home-page-wrapper"></div>)
        const {getByText, getByTestId} =  render(<App/>);
        expect(getByText("Tech Test")).toBeInTheDocument();
        expect(getByTestId('main-layout')).toBeInTheDocument();
        expect(getByTestId('home-page-wrapper')).toBeInTheDocument();
    });
});
