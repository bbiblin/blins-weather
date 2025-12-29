"use client"
import {getCurrentWeatherInfo, getUserLocationInfo, getEnviromentInfo } from "./utils/api";
import { useState, useEffect, use } from "react";
import WeatherCard  from "./components/weatherCard"

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
  is_day: number;
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

  const isReady = locationInfo && weatherInfo && enviromentInfo;

  
  const isDay = enviromentInfo?.is_day === 1;

  const backgroundClass = isDay
  ? "bg-linear-to-b from-[#ffe8dc] via-[#F4D2CD] to-[#E2B7BE]"
  : "bg-linear-to-b from-[#E1B6DB] via-[#B5A5D3] to-[#8B8FB0]";
  

return (
  <div
  className={`flex min-h-screen w-full overflow-x-hidden items-center justify-center font-sans transition-colors duration-700 ${backgroundClass}`}>

    {isReady && (
      <main className=" flex w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-24 sm:px-8 md:px-16">        
        <h1 className="text-3xl font-semibold">
          <p className="text-sm text-zinc-500">
            {locationInfo.country} — {locationInfo.localtime}
          </p>
          <WeatherCard/>
        </h1>
        <h2 className="mt-6 text-5xl">
          {weatherInfo.current_condition_text}
        </h2>

        <img src={weatherInfo.current_condition_img} alt="" />

        <h2 className="mt-6 text-5xl">{enviromentInfo.wind_kph}</h2>
        <h2 className="mt-6 text-5xl">{enviromentInfo.wind_dir}</h2>
        <h2 className="mt-6 text-5xl">{enviromentInfo.humidity}</h2>
        <h2 className="mt-6 text-5xl">{enviromentInfo.cloud}</h2>
      </main>
    )}
  </div>
);

}
