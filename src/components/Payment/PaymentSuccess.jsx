import React from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link, useSearchParams } from 'react-router-dom'


const PaymentSuccess = () => {

  const reference = useSearchParams()[0].get('reference');
  
  return (
    <Container h={"100vh"} p={'12'}>
      <Heading 
        children='You have Pro Pack'
        my={'8'}
        textAlign={'center'}
      />
      <VStack boxShadow={'lg'} pb={'12'} alignItems={'center'}>
       <Box w={'full'} bg={'yellow.400'} p={'4'} css={{borderRadius: "8px 8px 0 0 "}}>
          <Text color={'black'}>
            Payment Success
          </Text>
       </Box>
       <Box p={'4'}>
        <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
          <Text>
            Congratulation You're a pro member. You have access to premium
          </Text>
          <Heading size={"4xl"}>
            <RiCheckboxCircleFill/>
          </Heading>
        </VStack>
       </Box>
       <Link to='/profile'>
         <Button variant={'ghost'}>
           Go to profile
         </Button>
       </Link>
       <Heading size={'xs'}>
          Reference: {reference}
       </Heading>
      </VStack>
    </Container>
  )
}

export default PaymentSuccess