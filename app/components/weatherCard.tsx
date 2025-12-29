"use client";
import { useState, useEffect } from "react";
import { getCurrentWeatherInfo, getUserLocationInfo } from "../utils/api";

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

export default function WeatherCard() {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

  useEffect(() => {
    async function loadWeatherInfo() {
      const weather_response = await getCurrentWeatherInfo();
      setWeatherInfo(weather_response);
    }
    loadWeatherInfo();
  }, []);

  useEffect(() => {
    async function loadLocationInfo()
      {
        const info_response = await getUserLocationInfo();
        setLocationInfo(info_response);
      }
      loadLocationInfo();
  },[]);

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white/20 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] ring-1 ring-white/30 sm:max-w-md sm:backdrop-blur-md"
      >
        <div className="flex flex-col gap-4 p-6 sm:p-8">

          {weatherInfo && locationInfo ? (
            <>
            <div className="text-center text-sm text-gray-600">
                {locationInfo.name}, {locationInfo.region}
              </div>
              <div className="text-5xl font-semibold text-center text-gray-800">
                {weatherInfo.current_celsius}°C
              </div>

              <div className="text-center text-sm text-gray-700">
                Se siente  como {weatherInfo.current_sensacion_c}°C
              </div>

              <div className="text-center text-sm text-gray-600">
                {weatherInfo.current_faren}°F
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400 animate-pulse">
              Cargando clima…
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
