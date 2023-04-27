import React, { useState, useContext } from "react";
//import icons
import { BsCalendarEvent } from "react-icons/bs";

//import chakra ui components
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

//import moment
import moment from "moment";

//import datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import context
import { StationContext } from "../StationContext";

const Calendar = () => {
    const { period, setPeriod, periodSelected, setPeriodSelected } =
        useContext(StationContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(false);
    let x = 0;

    function handlePeriodSubmit() {
        if (startDate.getTime() - endDate.getTime() < 0) {
            return true;
        } else {
            return false;
        }
        // console.log(
        //     "boom",
        //     startDate.getTime() - endDate.getTime(),
        //     startDate.getTime(),
        //     endDate.getTime()
        // );
    }

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    const errorMessage = () => {
        return (
            <Text color="red.500" fontSize={20}>
                Veuillez choisir une période valide
            </Text>
        );
    };

    return (
        <>
            <BsCalendarEvent
                onClick={() => {
                    // if (x == 0) {
                    //     // console.log(startDate);
                    //     // console.log(endDate);
                    //     x++;
                    //     console.log("premier");
                    // } else {
                    //     setStartDate(startDate);
                    // }
                    setError(false);

                    onOpen();
                }}
            />
            <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Sélectionner une période ( 1j minimum )
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {error ? errorMessage() : null}
                        <Center>
                            <Text pb={10}>
                                {/* Du {startDate.toLocaleDateString()} au{" "}
                                {endDate.toLocaleDateString()} */}
                                Du{" "}
                                {!selected
                                    ? period[0].toLocaleDateString() +
                                    " au " +
                                    period[1].toLocaleDateString()
                                    : startDate.toLocaleDateString() +
                                    " au " +
                                    endDate.toLocaleDateString()}
                            </Text>
                        </Center>
                        <Spacer />
                        <Flex gap={4}>
                            <Text>Du</Text>
                            <Box border={"solid gray 1px"}>

                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={selected ? startDate : yesterday}
                                    onChange={(date: Date) => {
                                        setSelected(true);
                                        setStartDate(date);
                                    }}
                                />
                            </Box>
                            <Text>au</Text>
                            <Box border={"solid gray 1px"}>
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    selected={endDate}
                                    onChange={(date: Date) => {
                                        setSelected(true);
                                        setEndDate(date);
                                    }}
                                />
                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => {
                                if (handlePeriodSubmit()) {
                                    // console.log(window.location);
                                    // let url = window.location;
                                    // url.search = `?start_date=${moment(
                                    //     startDate
                                    // ).format("YYYY-MM-DD")}&end_date=${moment(
                                    //     endDate
                                    // ).format("YYYY-MM-DD")}`;

                                    // var new_url = url.toString();
                                    // console.log(new_url);
                                    onClose();
                                    setPeriod([startDate, endDate]);
                                    setError(false);
                                    setPeriodSelected(true);
                                } else {
                                    setError(true);
                                }
                                // console.log(period);
                            }}
                        >
                            Valider
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Calendar;
