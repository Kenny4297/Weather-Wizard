import React from "react";
import { render, screen, act } from "@testing-library/react";
import DisplayForecast from "../DisplayForecast";

interface ForecastDataInterface {
    list: Array<{
      dt_txt: string;
      main: {
        temp: number;
        humidity: number;
      };
      weather: Array<{
        icon: string;
        description: string;
      }>;
      wind: {
        speed: number;
      };
    }>;
  }

describe("DisplayForecast component", () => {
    it("renders all data-testid", async () => {
        const mockData = {
            list: [
                {
                    dt_txt: "2023-05-17 12:00:00",
                    main: {
                        temp: 70,
                        humidity: 60,
                    },
                    weather: [
                        {
                            icon: "01d",
                            description: "Clear sky",
                        },
                    ],
                    wind: {
                        speed: 10,
                    },
                },
                // Add more mock data as needed
            ],
        };

        render(
            <DisplayForecast forecastDataProp={mockData} isLoading={false} />
        );

        // Use `findBy` which waits for the elements to be in the document
        expect(
            await screen.findByTestId("forecast-css-test")
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId("forecast-date-test")
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId("forecast-text-test")
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId("icon-images-test")
        ).toBeInTheDocument();
        expect(
            await screen.findByTestId("weather-description-test")
        ).toBeInTheDocument();
        expect(await screen.findByTestId("humidity-test")).toBeInTheDocument();
        expect(
            await screen.findByTestId("wind-speed-test")
        ).toBeInTheDocument();
    });
});
