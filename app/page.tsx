"use client"
import {getCurrentWeatherInfo, getUserLocationInfo, getEnviromentInfo } from "./utils/api";
import { useState, useEffect, use } from "react";

type WeatherInfo = {
  current_celsius: number;
  current_faren: number;
  current_sensacion_c: number;
  current_condition_text: string;
  current_condition_img: string;
};

type LocationInfo = {
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

export default function Home() {

  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [enviromentInfo, setEnviromentInfo] = useState<EnviromentInfo | null>(null);
  
  useEffect(() => {
    async function loadWeatherInfo()
      {
        const weather_response = await getCurrentWeatherInfo();
        setWeatherInfo(weather_response);
      }
      loadWeatherInfo();
  },[]);

  useEffect(() => {
    async function loadLocationInfo()
      {
        const info_response = await getUserLocationInfo();
        setLocationInfo(info_response);
      }
      loadLocationInfo();
  },[]);

  useEffect(() => {
    async function loadEnviromentInfo()
      {
        const condition_response = await getEnviromentInfo();
        setEnviromentInfo(condition_response);
      }
      loadEnviromentInfo();
  },[]);
  

  return (

    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {locationInfo && (
          <>
            <h1 className="text-3xl font-semibold">
              {locationInfo.name}, {locationInfo.region}
            </h1>
            <p className="text-sm text-zinc-500">
              {locationInfo.country} — {locationInfo.localtime}
            </p>
          </>
        )}

        <h2 className="mt-6 text-5xl">
          {weatherInfo?.current_celsius}°C
        </h2>

        <h2 className="mt-6 text-5xl">
          Sensación térmica: {weatherInfo?.current_sensacion_c}°C
        </h2>

        <p className="text-lg text-zinc-600">
          {weatherInfo?.current_faren}°F
        </p>

        <h2 className="mt-6 text-5xl">
          {weatherInfo?.current_condition_text}
        </h2>

        <img src={weatherInfo?.current_condition_img} alt="" />

        <h2 className="mt-6 text-5xl">
          {enviromentInfo?.wind_kph}
        </h2>

        <h2 className="mt-6 text-5xl">
          {enviromentInfo?.wind_dir}
        </h2>

        <h2 className="mt-6 text-5xl">
          {enviromentInfo?.humidity}
        </h2>

        <h2 className="mt-6 text-5xl">
          {enviromentInfo?.cloud}
        </h2>
      </main>
    </div>
  );
}
