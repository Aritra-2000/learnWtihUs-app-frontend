import React from 'react'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Container h={"100vh"}>
      <VStack h={'full'} justifyContent={'center'} spacing={'4'}>
      <RiErrorWarningFill size={'5rem'}/>
      <Heading 
        children='Page Not Found'
        my={'8'}
        textAlign={'center'}
      />
       <Link to='/'>
         <Button variant={'ghost'}>
           Go to home
         </Button>
       </Link>
      </VStack>
    </Container>
  )
}

export default NotFound