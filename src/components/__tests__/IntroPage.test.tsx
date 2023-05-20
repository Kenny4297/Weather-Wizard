import { render, screen, fireEvent } from "@testing-library/react";
import IntroPage from "../IntroPage";
import React from "react";
import { MemoryRouter } from "react-router-dom";

// Clearing localstorage before running tests
beforeEach(() => {
    localStorage.clear();
});

test("renders IntroPage component", () => {
    render(
        <MemoryRouter>
            <IntroPage setCity={jest.fn()} />
        </MemoryRouter>
    );
    const introPageElement = screen.getByTestId("intro-page");
    expect(introPageElement).toBeInTheDocument();
});

test("form input is updated correctly when user types in a value", () => {
    render(
        <MemoryRouter>
            <IntroPage setCity={jest.fn()} />
        </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New York" } });
    expect(input.value).toBe("New York");
});

test("submit button is disabled when input value is empty", () => {
    render(
        <MemoryRouter>
            <IntroPage setCity={jest.fn()} />
        </MemoryRouter>
    );
    const submitButton = screen.queryByRole("button", {
        name: "Today's Weather",
    });
    expect(submitButton).toBeDisabled();
});

test("submit button is enabled when input value is not empty", () => {
    render(
        <MemoryRouter>
            <IntroPage setCity={jest.fn()} />
        </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    const submitButton = screen.queryByRole("button", {
        name: "Today's Weather",
    });
    fireEvent.change(input, { target: { value: "New York" } });
    expect(submitButton).toBeEnabled();
});

test("form is submitted when user enters valid city name and clicks submit button", () => {
    const setCity = jest.fn();
    render(
        <MemoryRouter>
            <IntroPage setCity={setCity} />
        </MemoryRouter>
    );
    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", {
        name: "Today's Weather",
    });
    fireEvent.change(input, { target: { value: "New York" } });
    fireEvent.click(submitButton);
    expect(setCity).toHaveBeenCalledWith("New York");
});

test("Set Default City button is displayed when a city has been entered", () => {
    const setCity = jest.fn();
    render(
        <MemoryRouter>
            <IntroPage setCity={setCity} city="New York" />
        </MemoryRouter>
    );
    const setDefaultButton = screen.getByRole("button", {
        name: "Set Default City",
    });
    expect(setDefaultButton).toBeInTheDocument();
});

test("Set Default City button is not displayed when no city has been entered", () => {
    render(
        <MemoryRouter>
            <IntroPage setCity={jest.fn()} />
        </MemoryRouter>
    );
    const setDefaultButton = screen.queryByRole("button", {
        name: "Set Default City",
    });
    expect(setDefaultButton).not.toBeInTheDocument();
});

test("Set Default City button is enabled when the current city is not the default", () => {
    localStorage.setItem("defaultCity", "San Francisco");
    const setCity = jest.fn();
    render(
        <MemoryRouter>
            <IntroPage setCity={setCity} city="New York" />
        </MemoryRouter>
    );
    const setDefaultButton = screen.getByRole("button", {
        name: "Set Default City",
    });
    expect(setDefaultButton).toBeEnabled();
});

test("clicking Set Default City button sets the current city as the default in local storage", () => {
    const setCity = jest.fn();
    render(
        <MemoryRouter>
            <IntroPage setCity={setCity} city="New York" />
        </MemoryRouter>
    );
    const setDefaultButton = screen.getByRole("button", {
        name: "Set Default City",
    });
    fireEvent.click(setDefaultButton);
    expect(localStorage.getItem("defaultCity")).toBe("New York");
});

test("Set Default City button is disabled when the current city is already the default", () => {
    localStorage.setItem("defaultCity", "New York");
    const setCity = jest.fn();
    render(
        <MemoryRouter>
            <IntroPage setCity={setCity} city="New York" />
        </MemoryRouter>
    );
    const setDefaultButton = screen.getByRole("button", {
        name: "Set Default City",
    });
    expect(setDefaultButton).toBeDisabled();
});
