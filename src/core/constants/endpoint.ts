export const getAvailableCountriesEndpoint = 'https://date.nager.at/api/v3/AvailableCountries';

export const getAllHolidaysEndpoint = (currentYear: number, countryCode: string) => `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/${countryCode}`;
