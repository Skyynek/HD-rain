
import { Button, Grid, GridItem, Input, FormControl, FormLabel, FormHelperText, InputRightElement, InputGroup, Center, Flex, Box } from '@chakra-ui/react'

import React from "react"
import FormConnection from '../composants/FormConnection'
import FormCreateAccount from '../composants/FormCreateAccount'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function Authentification() {

    const [state, setState] = useState("connection")
   
    return (

        <Flex height="100vh" gap='2'>
            <Center w="50%">
                        <Box w="75%"><img src=".././assets/images/logo.svg" alt="logo HD RAIN" />
                        </Box>
            </Center>     

                <Center p='4' w="50%" bg='#2F10E9' color='white'>
                   <Outlet></Outlet>
                </Center>
        </Flex>
    )
}

export default Authentification;