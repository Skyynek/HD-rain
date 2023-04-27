import React from "react";
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
    Divider,
} from "@chakra-ui/react";

import {
    WiCelsius,
    WiBarometer,
    WiHumidity,
    WiShowers,
    WiStrongWind,
    WiWindDeg,
} from "react-icons/wi";

const SumLastog = ({ lastLog, station }) => {
    if (lastLog) {
        // console.log(lastLog);
        return (
            <div>
                <Center>
                    <Flex gap={6}>
                        <Text>Latitude ( ° ) : {station.latitude}</Text>
                        <Text>Longtitude ( ° ) : {station.longitude}</Text>
                    </Flex>
                </Center>
                <Center gap={2}>
                    <Box px={4} color="black" maxW="md">
                        <Text color="gray">Température ( °C ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiCelsius size={25} />
                            <Text>{lastLog[0].temperature} </Text>
                        </Flex>
                        <Text color="gray">Point de rosée ( °C ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiCelsius size={25} />
                            <Text>{lastLog[0].point_de_rosee} </Text>
                        </Flex>
                        <Text color="gray">Pression ( hPa ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiBarometer size={25} />
                            <Text>{lastLog[0].pression} </Text>
                        </Flex>
                        <Text color="gray">Humidité ( % ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiHumidity size={25} />
                            <Text>{lastLog[0].humidite} </Text>
                        </Flex>
                        <Text color="gray">
                            Précipitations dans l'heure ( mm )
                        </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiShowers size={25} />
                            <Text>{lastLog[0].pluie_1h} </Text>
                        </Flex>
                    </Box>
                    <Divider height={60} orientation="vertical" />
                    <Box color="black" maxW="md" pb="20" pt={34} px={4}>
                        <Text color="gray">Vents moyens ( km/h ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiStrongWind size={25} />
                            <Text>{lastLog[0].vent_moyen} </Text>
                        </Flex>
                        <Text color="gray">Vents rafales ( km/h ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiStrongWind size={25} />
                            <Text>
                                {lastLog[0].vent_rafales == null
                                    ? "no data"
                                    : lastLog[0].vent_rafales}
                            </Text>
                        </Flex>

                        <Text color="gray">Vents direction ( ° ) </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiWindDeg size={25} />
                            <Text>{lastLog[0].vent_direction} </Text>
                        </Flex>
                        <Text color="gray">
                            Précipitations dans les 3h ( mm )
                        </Text>
                        <Flex alignContent="center" gap={3}>
                            <WiShowers size={25} />
                            <Text>
                                {lastLog[0].pluie_3h == null
                                    ? "no data"
                                    : lastLog[0].pluie_3h}
                            </Text>
                        </Flex>
                    </Box>
                </Center>
            </div>
        );
    } else {
        return (
            <div>
                <Text>Loading</Text>
            </div>
        );
    }
};

export default SumLastog;
