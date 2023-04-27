import { createContext, useState, useEffect } from "react";

//create context
export const StationContext = createContext({});

const StationContextProvider = ({ children }: any) => {
    const [stations, setStations] = useState([""]);
    const [isLoading, setIsLoading] = useState(true);
    const [periodSelected, setPeriodSelected] = useState(false);

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);
    const [period, setPeriod] = useState([yesterday, new Date()]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/stations-data")
            .then((response) => response.json())
            .then((datas) => {
                setStations(datas.data);
                setIsLoading(false);
            });
    }, []);

    return (
        <StationContext.Provider
            value={{
                stations,
                setStations,
                isLoading,
                setIsLoading,
                period,
                setPeriod,
                periodSelected,
                setPeriodSelected,
            }}
        >
            {children}
        </StationContext.Provider>
    );
};

export default StationContextProvider;
