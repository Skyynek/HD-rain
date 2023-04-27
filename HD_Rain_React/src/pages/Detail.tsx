import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import { useParams, Link } from "react-router-dom";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Show,
    Hide,
    Box,
    Flex,
    IconButton,
    Spacer,
    Text,
    Container,
    HStack,
    Grid,
    GridItem,
    Center,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

import { BsArrowReturnLeft, BsCalendarEvent } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

//import context
import { StationContext } from "../StationContext";

// Import composants
import SumLastog from "../composants/SumLastog";
import Calendar from "../composants/DatePicker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Detail() {
    const { period, periodSelected, setPeriodSelected } =
        useContext(StationContext);

    const [station, setStation] = useState();
    const [displayGraph, setDisplayGraph] = useState("0");
    const [isSelected, SetisSelected] = useState(true);
    const [loading, setLoading] = useState(true);
    const [log, setLog] = useState(null);
    const [temperature, setLogTemperature] = useState(null);
    const [point_de_rosee, setLogPoint_de_rosee] = useState(null);

    const [pression, setLogPression] = useState(null);
    const [humidite, setLogHumidite] = useState(null);

    const [vent_moyen, setLogVent_moyen] = useState(null);
    const [vent_direction, setLogVent_direction] = useState(null);

    const [pluie_3h, setLogPluie_3h] = useState(null);
    const [pluie_1h, setLogPluie_1h] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [startDate, setStartDate] = useState(new Date());
    // const [datasets, setDatasets] = useState([{}]);

    const [labels, setLogLabels] = useState([0, 9]);

    let { id } = useParams();

    const optionsTemperature = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Rélevé des Températures et de point de rosee ( °C )",
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                ticks: {
                    color: "rgb(255, 99, 132)",
                },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                ticks: {
                    color: "rgb(53, 162, 235)",
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const optionsPressionHumidite = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Rélevé de la Pression et Humidité",
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                ticks: {
                    color: "rgb(255, 99, 132)",
                },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                ticks: {
                    color: "rgb(53, 162, 235)",
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const optionsVent = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Rélevé des vents",
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                ticks: {
                    color: "rgb(255, 99, 132)",
                },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                ticks: {
                    color: "rgb(53, 162, 235)",
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };
    const optionsPluie = {
        responsive: true,
        interaction: {
            mode: "index" as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: "Pluviometre",
            },
        },
        scales: {
            y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                ticks: {
                    color: "rgb(255, 99, 132)",
                },
            },
            y1: {
                type: "linear" as const,
                display: true,
                position: "right" as const,
                ticks: {
                    color: "rgb(53, 162, 235)",
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
        },
    };

    const dataTemperature = {
        labels,
        datasets: [
            {
                label: "Temperature",
                data: temperature,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Point_de_rosee",
                data: point_de_rosee,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "y1",
            },
        ],
    };
    const dataPressionHumidite = {
        labels,
        datasets: [
            {
                label: "Pression",
                data: pression,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Humidite",
                data: humidite,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "y1",
            },
        ],
    };
    const dataVent = {
        labels,
        datasets: [
            {
                label: "Vent_moyen",
                data: vent_moyen,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Vent_direction",
                data: vent_direction,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "y1",
            },
        ],
    };
    const dataPluie = {
        labels,
        datasets: [
            {
                label: "Pluie_3h",
                data: pluie_3h,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "y",
            },
            {
                label: "Pluie_1h",
                data: pluie_1h,
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "y1",
            },
        ],
    };

    function filterLog(logs: []) {
        // console.log(moment(period[0]).format("YYYY-MM-DD"));
        // console.log("En cours de traitement : ", logs.slice(0, 10));
        let lastTenLogs = logs.slice(logs.length - 10, logs.length);
        let lastLog = logs.slice(0, 1);
        // console.log(lastLog);
        setLog(lastLog);
        filterLogLabel(lastTenLogs);

        // console.log(log);
        filterLogTemperature(lastTenLogs);
        filterLogPointDeRosee(lastTenLogs);

        filterLogPression(lastTenLogs);
        filterLogHumidite(lastTenLogs);

        filterLogVent_moyen(lastTenLogs);
        filterLogVent_direction(lastTenLogs);

        filterLogPluie_3h(lastTenLogs);
        filterLogPluie_1h(lastTenLogs);

        return;
    }

    function filterLogLabel(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.dh_utc);
        });
        // console.log(arr, "labels");
        setLogLabels(arr);

        return;
    }

    //Premier Graphique
    function filterLogTemperature(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.temperature);
        });
        // console.log(arr);
        setLogTemperature(arr);

        return;
    }
    function filterLogPointDeRosee(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.point_de_rosee);
        });
        // console.log(arr);
        setLogPoint_de_rosee(arr);

        return;
    }
    //Deuxieme Graphique
    function filterLogPression(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.pression);
        });
        // console.log(arr);
        setLogPression(arr);

        return;
    }
    function filterLogHumidite(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.humidite);
        });
        // console.log(arr);
        setLogHumidite(arr);

        return;
    }
    //Troisieme Graphique
    function filterLogVent_moyen(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.vent_moyen);
        });
        // console.log(arr);
        setLogVent_moyen(arr);

        return;
    }
    function filterLogVent_direction(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.vent_direction);
        });
        // console.log(arr);
        setLogVent_direction(arr);

        return;
    }
    //Quatrieme Graphique
    function filterLogPluie_3h(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.pluie_3h);
        });
        // console.log(arr);
        setLogPluie_3h(arr);

        return;
    }
    function filterLogPluie_1h(logs: []) {
        let arr = [];
        logs.map((element) => {
            arr.push(element.pluie_1h);
        });
        // console.log(arr);
        setLogPluie_1h(arr);

        return;
    }

    useEffect(() => {
        console.log(
            periodSelected,
            moment(period[0]).format("YYYY-MM-DD"),
            moment(period[1]).format("YYYY-MM-DD"),
            station
        );
        let url = `http://127.0.0.1:8000/detail/${id}/?start_date=${moment(
            period[0]
        ).format("YYYY-MM-DD")}&end_date=${moment(period[1]).format(
            "YYYY-MM-DD"
        )}`;
        console.log(url);
        fetch(url)
            .then((response) => {
                // console.log(response.json());
                return response.json();
            })
            .then((datas) => {
                // console.log(datas);
                setLoading(false);
                setStation(datas.data);
                setPeriodSelected(false);
            });
        loading == false && station ? filterLog(station.hourly[id]) : null;

        // fetchData;
    }, [loading, periodSelected]);

    if (station) {
        return (
            <div>
                {/* Debut Navbar */}

                {/* Version mobile */}
                <Hide above="md">
                    <Tabs isFitted variant="enclosed">
                        <TabList mb="1em" boxShadow="sm">
                            <Tab
                                boxShadow="md"
                                bgColor={isSelected ? "#2F10E9" : "white"}
                                color={isSelected ? "white" : "black"}
                                onClick={() => {
                                    SetisSelected(!isSelected);
                                }}
                                borderRadius="0"
                                borderBottomRightRadius="md"
                            >
                                Données
                            </Tab>
                            <Tab
                                bgColor={isSelected ? "white" : "#2F10E9"}
                                color={isSelected ? "black" : "white"}
                                onClick={() => {
                                    SetisSelected(!isSelected);
                                }}
                                borderRadius="0"
                                borderBottomLeftRadius="md"
                            >
                                Graphique
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <p>Données</p>
                            </TabPanel>
                            <TabPanel>
                                <p>Graphique</p>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Hide>

                {/* Version desktop */}
                <Hide below="md">
                    <Flex bg="#2F10E9" p={5} color="white" alignItems="center">
                        <Box>
                            <Link to="/">
                                <Text fontSize="4xl" ml={5}>
                                    <IconButton
                                        size="xxl"
                                        variant="outline"
                                        bg="#2F10E9"
                                        aria-label="Search database"
                                        icon={<BsArrowReturnLeft />}
                                    />
                                </Text>
                            </Link>
                        </Box>
                        <Spacer />
                        <Box>
                            <Text fontSize="2xl">
                                Relevés de la station {station.stations[0].name}
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <Text fontSize="4xl" mr={5}>
                                <RxAvatar />
                            </Text>
                        </Box>
                    </Flex>
                </Hide>

                {/* Fin Navbar */}

                <HStack spacing="24px" mx={10} mt={5}>
                    <Box w="40%" h={600} boxShadow="base">
                        {/* {logDisplay()} */}
                        <Flex
                            alignItems="center"
                            mx={10}
                            mt={10}
                            gap={5}
                            pb={10}
                        >
                            <Text fontSize={30}>
                                {/* <IconButton
                                    size="3xl"
                                    // variant="outline"
                                    bg="#FFFFF"
                                    aria-label="Calendar"
                                    icon={<BsCalendarEvent />}
                                /> */}
                                <Calendar />
                            </Text>
                            <Flex gap={3}>
                                <Text fontWeight="bold">Relevé du </Text>
                                <Text>
                                    {log ? log[0].dh_utc : "pas de logo"}
                                </Text>
                            </Flex>

                            {/* test modal date picker */}
                        </Flex>
                        <SumLastog
                            lastLog={log}
                            station={station.stations[0]}
                        />
                    </Box>
                    <Box w="60%" h={600} boxShadow="base">
                        <Tabs>
                            <TabList>
                                <Tab>Temperature</Tab>
                                <Tab>Pression - Humidite</Tab>
                                <Tab>Vent</Tab>
                                <Tab>Pluie</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Line
                                        options={optionsTemperature}
                                        data={dataTemperature}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <Line
                                        options={optionsPressionHumidite}
                                        data={dataPressionHumidite}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <Line
                                        options={optionsVent}
                                        data={dataVent}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <Line
                                        options={optionsPluie}
                                        data={dataPluie}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {/* <Button onClick={(e) => setDisplayGraph("1")}>
                            {displayGraph}
                        </Button> */}
                    </Box>
                </HStack>
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default Detail;
