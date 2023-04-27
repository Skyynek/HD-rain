import { Button, Grid, GridItem, Input, FormControl, FormLabel, FormHelperText, InputRightElement, InputGroup, Center, Flex, Box } from '@chakra-ui/react'
import { useSignIn } from 'react-auth-kit'

import React from "react"

import { Link } from "react-router-dom";

function FormConnection() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const signIn = useSignIn()
    return (
        <Box >
            <Box>
                <Center>
                    <h1 className='connect'>Connectez-vous</h1>
                </Center>
            </Box>

            <FormControl mt="3em"  >
                <FormLabel>Email</FormLabel>
                <Input
                    p="25px"
                    type='email'
                    bg="white"
                    placeholder='Entrez votre email'
                    color='black'
                />

                <FormControl mt="2.5em">
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                        p="25px"
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Entrez votre mot de passe'
                        bg="white"
                        color='black'
                    />
                </FormControl>
                <FormControl mt="3em">
                    <Center>
                        <Button
                            px="80px"
                            _hover={{ bg: '#303030' }}
                            variant='outline'
                            color='white'
                            onClick={handleClick}>
                            Se connecter
                        </Button>

                    </Center>
                </FormControl>
            </FormControl>
            <Center mt="1em"> 
            <Link className='link' to='/authentification/creation'>Créer un compte</Link>
            </Center>
        </Box>

    )
}

export default FormConnection;