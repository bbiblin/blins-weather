import { getUserLocation } from "./utils";
// types
type WeatherInfo = {
  current_celsius: number;
  current_faren: number;
  current_sensacion_c: number;
  current_condition_text: string;
  current_condition_img: string;
};

type UserLocationInfo = {
  name: string;
  region: string;
  country: string;
  localtime: string;
};

type EnviromentInfo ={
  wind_kph: number;
  wind_dir: number;
  humidity: number;
  cloud: number;
}

export async function getCurrentWeatherInfo(): Promise<WeatherInfo> {
  try 
    {
    
    const { latitude, longitude } = await getUserLocation();

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${latitude},${longitude}`);

    if (!response.ok) 
    {
      throw new Error("Error while getting the current weather");
    }

    const data = await response.json();
    const current = data.current;

    return {
            current_celsius: current.temp_c,
            current_faren: current.temp_f,
            current_sensacion_c: current.feelslike_c,
            current_condition_text: current.condition.text,
            current_condition_img: current.condition.icon,
    };

    } 
    catch (error) 
    {
        if (error instanceof TypeError) 
    {
        console.error("Error while getting the weather:", error.message);
        alert("Connection error");
    } 
    else 
    {
      console.error(
        "Unexpected error while getting weather:",
        (error as Error).message
      );
      alert("Unexpected error while getting weather, please try again later.");
    }
    throw error;
    }
}

export async function getUserLocationInfo(): Promise<UserLocationInfo> {
    try
    {
        const { latitude, longitude } = await getUserLocation();
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${latitude},${longitude}`);
        if (!response.ok)
        {
            throw new Error("Error while getting the user's location info");
        }

        const data = await response.json();
        const location = data.location;
        return {
            name: location.name,
            region: location.region,
            country: location.country,
            localtime: location.localtime,
    };
    }
    catch (error)
    {
        if (error instanceof TypeError) 
    {
        console.error("Error while getting the user's location info:", error.message);
        alert("Connection error");
    } 
    else 
    {
      console.error(
        "Unexpected error while getting the user's location info:",
        (error as Error).message
      );
      alert("Unexpected error while user's location info, please try again later.");
    }
    throw error;
    }
}

export async function getEnviromentInfo(): Promise<EnviromentInfo>{
  try
  {
      const { latitude, longitude } = await getUserLocation();
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${latitude},${longitude}`);
        if (!response.ok)
        {
            throw new Error("Error while getting the user's enviroment info");
        }

        const data = await response.json();
        const current = data.current;

        return {
            wind_dir: current.wind_dir,
            wind_kph: current.wind_kph,
            humidity: current.humidity,
            cloud: current.cloud,
    };
    }
    catch (error)
    {
        if (error instanceof TypeError) 
    {
        console.error("Error while getting the user's enviroment info:", error.message);
        alert("Connection error");
    } 
    else 
    {
      console.error(
        "Unexpected error while getting the user's enviroment info:",
        (error as Error).message
      );
      alert("Unexpected error while user's enviroment info, please try again later.");
    }
    throw error;
    }

  }
