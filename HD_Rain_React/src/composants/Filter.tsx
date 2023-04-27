
import {
    Button,
    Grid,
    GridItem,
    Select,
    Icon,
    Input,
    Center
} from "@chakra-ui/react";

import { FaUserCircle } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

export default function Filter() {
    return (
        <Center>
            <Grid templateColumns="repeat(12, 1fr)" gap={10} autoFlow="row dense" mt={2} >
                <GridItem colSpan={9} >
                    <Grid zIndex="popover" position={"relative"} bg="white" templateColumns="repeat(6, 1fr)" p={5} boxShadow="md">
                        <GridItem colSpan={1}>
                            <Select
                                placeholder="Période"
                                border="0px"
                                borderRight="1px"
                                borderColor="gray.200"
                                borderRadius="0px"
                            >
                                <option value="min">&#60; 5 min</option>
                                <option value="day">&#60; 24H</option>
                                <option value="days"> &#62; 24H</option>
                            </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Select
                                placeholder="Département"
                                border="0px"
                                borderRight="1px"
                                borderColor="gray.200"
                                borderRadius="0px"
                            >
                                <option value="hg">Haute-Garonne</option>
                                <option value="gers">Gers</option>
                                <option value="lotetg">Lot-et-Garonne</option>
                            </Select>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Input
                                type="departement"
                                placeholder="Haute-Garonne..."
                                border="0px"
                                borderColor="gray.200"
                                borderRadius="0px"
                                mr={2}
                            />
                        </GridItem>
                        <Button colorScheme="teal" variant="ghost">
                            <BsSearch />
                        </Button>
                    </Grid></GridItem>
                <GridItem colSpan={2}></GridItem>
                <GridItem colSpan={1}  >
                    <Icon as={FaUserCircle} zIndex="popover" position={"relative"} boxSize={10} mt={5}></Icon>
                </GridItem>
            </Grid>
        </Center>
    )
}