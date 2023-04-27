import { Button, Grid, GridItem, Input, FormControl, FormLabel, FormHelperText, InputRightElement, InputGroup, Center, Flex, Box } from '@chakra-ui/react'

import React from "react"
import { Link } from "react-router-dom";

function FormCreateAccount() {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box >
            <Box>
                <Center>
                    <h1 className='connect'>Créez un compte</h1>
                </Center>
            </Box>

            <FormControl mt="1em"  >
                <FormLabel>Nom</FormLabel>
                <Input
                    p="20px"
                    type='text'
                    bg="white"
                    placeholder='Entrez votre nom'
                    color='black'
                    mb="1.1em"
                />
                <FormLabel>Prénom</FormLabel>
                <Input
                    p="20px"
                    type='text'
                    bg="white"
                    placeholder='Entrez votre prénom'
                    color='black'
                    mb="1.1em"
                />
                <FormLabel>Email</FormLabel>
                <Input
                    p="20px"
                    type='text'
                    bg="white"
                    placeholder='Entrez votre email'
                    color='black'
                    mb="1.1em"
                />

                <FormLabel>Créez votre mot de passe</FormLabel>
                <Input
                    p="20px"
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Créez votre mot de passe'
                    bg="white"
                    color='black'
                    mb="1.1em"
                />

                <FormLabel>Confirmez votre mot de passe</FormLabel>
                <Input
                    p="20px"
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Confirmez votre mot de passe'
                    bg="white"
                    color='black'
                    mb="1.1em"
                />

                <FormControl mt="1em">
                    <Center>
                        <Button
                            px="80px"
                            _hover={{ bg: '#303030' }}
                            variant='outline'
                            color='white'
                            onClick={handleClick}>
                          Valider
                        </Button>
                    </Center>
                </FormControl>
            </FormControl>
            <Center mt="1em">
                <Link className='link' to='/authentification/connection'>Déjà un compte ? Se connecter</Link>
            </Center>
        </Box>

    )
}

export default FormCreateAccount;