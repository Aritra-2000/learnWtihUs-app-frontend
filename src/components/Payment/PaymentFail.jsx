import React from 'react'
import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
  return (
    <Container h={"100vh"}>
      <VStack h={'full'} justifyContent={'center'} spacing={'4'}>
      <RiErrorWarningFill size={'5rem'}/>
      <Heading 
        children='Payment Fail'
        my={'8'}
        textTransform={'upperCase'}
        textAlign={'center'}
      />
       <Link to='/subscribe'>
         <Button variant={'ghost'}>
           Try Again
         </Button>
       </Link>
      </VStack>
    </Container>
  )
}

export default PaymentFail;