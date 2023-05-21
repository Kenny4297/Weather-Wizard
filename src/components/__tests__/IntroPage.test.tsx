import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CityContext } from '../../App';
import IntroPage from '../IntroPage';

// Assuming setCity accepts a string, we define that type for our mock function
const mockSetCity = jest.fn();

beforeEach(() => {
    localStorage.clear();
    mockSetCity.mockClear();
});

test('renders IntroPage component', () => {
    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <IntroPage />
            </MemoryRouter>
        </CityContext.Provider>
    );

    const introPageElement = screen.getByTestId('intro-page');
    expect(introPageElement).toBeInTheDocument();
});

test("form input is updated correctly when user types in a value", () => {
    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <IntroPage />
            </MemoryRouter>
        </CityContext.Provider>
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "New York" } });
    expect(input.value).toBe("New York");
});

test("submit button is disabled when input value is empty", () => {
    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <IntroPage />
            </MemoryRouter>
        </CityContext.Provider>
    );
    const submitButton = screen.getByRole("button", {
        name: "Today's Weather",
    }) as HTMLButtonElement;
    expect(submitButton).toBeDisabled();
});

test("submit button is enabled when input value is not empty", () => {
    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <IntroPage />
            </MemoryRouter>
        </CityContext.Provider>
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
        name: "Today's Weather",
    }) as HTMLButtonElement;
    fireEvent.change(input, { target: { value: "New York" } });
    expect(submitButton).toBeEnabled();
});

test("form is submitted when user enters valid city name and clicks submit button", () => {
    render(
        <CityContext.Provider value={{ city: '', setCity: mockSetCity }}>
            <MemoryRouter>
                <IntroPage />
            </MemoryRouter>
        </CityContext.Provider>
    );
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const submitButton = screen.getByRole("button", {
        name: "Today's Weather",
    }) as HTMLButtonElement;
    fireEvent.change(input, { target: { value: "New York" } });
    fireEvent.click(submitButton);
    expect(mockSetCity).toHaveBeenCalledWith("New York");
});


