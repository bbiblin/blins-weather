type userLocation = {
    latitude: number;
    longitude: number;
};

export async function getUserLocation(): Promise<userLocation>
{
    if(!("geolocation" in navigator))
    {
        throw new Error("Geolocalización no soportada por el navegador");
    }

    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition
        (resolve, 
        reject,
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );

    });

    return{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
}