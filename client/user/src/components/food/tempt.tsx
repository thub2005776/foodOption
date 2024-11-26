import React, { useState, useEffect, RefCallback } from 'react';

const Temperature = ({ temp }: { temp: RefCallback<string> }) => {
    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        const fetchTemperature = async () => {
            const API_KEY: string = '921072f3fae11f24e5ba69880688c91f'
            const your_city: string = 'Hanoi,vn'
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${your_city}&APPID=${API_KEY}`);
                const data = await response.json();
                setTemperature(data.main.temp);
                temp(Math.round(data.main.temp / 10).toFixed(2))
            } catch (error) {
                console.error('Error fetching temperature:', error);
            }
        };

        fetchTemperature();
    }, []);

    const corlorTable = [
        { start: -20, end: 21.9, css: "bg-blue-500" },
        { start: 22, end: 23.9, css: "bg-blue-400" },
        { start: 24, end: 25.9, css: "bg-blue-300" },
        { start: 26, end: 27.9, css: "bg-blue-200" },
        { start: 28, end: 29.9, css: "bg-blue-100" },
        { start: 30, end: 31.9, css: "bg-yellow-100" },
        { start: 32, end: 33.9, css: "bg-yellow-200" },
        { start: 34, end: 35.9, css: "bg-yellow-300" },
        { start: 36, end: 37.9, css: "bg-orange-400" },
        { start: 38, end: 39.9, css: "bg-orange-500" },
        { start: 40, end: 80, css: "bg-red-500" },
    ]

    const temptCorlor = corlorTable.find(f => f.start <= Number(Math.round(temperature / 10).toFixed(1)) && f.end > Number(Math.round(temperature / 10).toFixed(1))) 

    return (
        <div>
            {temperature !== null ? (
                <div>
                    <p className='text-gray-900 dark:text-white'>
                        Nhiệt độ hiện tại: 
                        <span className={`${temptCorlor?.css} " text-xs font-medium me-2 px-2.5 py-0.5 rounded "`}>
                        {Math.round(temperature / 10).toFixed(1)}°C
                        </span>
                    </p>
                    <p className='mt-3 flex justify-center shadow-md p-2'>
                        <span className="flex w-3 h-8 bg-blue-500"></span>
                        <span className="flex w-3 h-8 bg-blue-400"></span>
                        <span className="flex w-3 h-8 bg-blue-300"></span>
                        <span className="flex w-3 h-8 bg-blue-200"></span>
                        <span className="flex w-3 h-8 bg-blue-100"></span>

                        <span className="flex w-3 h-8 bg-yellow-100"></span>
                        <span className="flex w-3 h-8 bg-yellow-200"></span>
                        <span className="flex w-3 h-8 bg-yellow-300"></span>
                        <span className="flex w-3 h-8 bg-orange-400"></span>
                        <span className="flex w-3 h-8 bg-orange-500"></span>
                        <span className="flex w-3 h-8 bg-red-500"></span>
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Temperature;