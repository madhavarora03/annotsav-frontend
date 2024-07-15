export const getWeatherData = async () => {
  const params: { [key: string]: any } = {
    latitude: 28.63,
    longitude: 77.22,
    daily: [
      "temperature_2m_max",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ],
    timezone: "auto",
  };

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      params[key].forEach((value: string) => url.searchParams.append(key, value));
    } else {
      url.searchParams.append(key, params[key]);
    }
  });

  const response = await fetch(url.toString());
  const data = await response.json();

  const daily = data.daily;
  
  const weatherData = {
    daily: {
      time: daily.time.map((t: number) => new Date(t)),
      temperature2mMax: daily.temperature_2m_max,
      precipitationProbabilityMax: daily.precipitation_probability_max,
      windSpeed10mMax: daily.wind_speed_10m_max,
    },
  };

  return weatherData;
};
