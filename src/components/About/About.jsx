import React from 'react'
import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import introVideo from '../../assets/videos/intro.mp4'
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition  from '../../assets/docs/termsAndCondition'


const Founder = ()=>(
    <Stack 
     direction={["column", 'row']}
     spacing={['4', '16']}
     padding={'8'}
     >
     <VStack>
        <Avatar boxSize={['40', '48']}/>
        <Text children="Co-Founder" opacity={0.7}/>
     </VStack>
     <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
        <Heading children="Arira Paul" size={['md', 'xl']}/>
        <Text 
        alignItems={['center', 'left']}
        children={`Hi, I am a full-stack developer. Our mision is to provide quality content`}/>
     </VStack>
    </Stack>
);

const VideoPlayer = () => (
    <Box>
        <video
            loop
            autoPlay
            muted
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
          ></video>
    </Box>
)

const TandC = () => (
   <Box>
    <Heading size={'md'} children={'Terms & Condition'} textAlign={['center', "left"]} my={'4'}/>
    <Box h="sm" p="4" overflowY={'scroll'}>
      <Text 
         fontFamily={'heading'} 
         letterSpacing={'widest'} 
         textAlign={['center', 'left']}
         >
         {termsAndCondition}
         </Text>
         <Heading 
            my={'4'} 
            size={'xs'}
            children="Refund only applicable for cancellation within 1 week "
         />
    </Box>
   </Box> 
)

const About = () => {
  return (
    <Container maxH={'container.xs'} maxW={'container.lg'} padding={'10'} boxShadow={'lg'}>
       <Heading children="About Us" textAlign={['center', 'left']}/>
       <Founder/>
       <Stack m={'8'} direction={['column', 'row']} textAlign={'center'}>
         <Text fontFamily={'cursive'} m={'2'} textAlign={['center', 'left']}>
            Also we provided some premium courses only for premium users
         </Text>
         <Link to="/subscribe">
            <Button variant={'ghost'} colorScheme='yellow'>
                Checkout Our Plan
            </Button>
         </Link>
       </Stack>

       <VideoPlayer/>

       <TandC termsAndCondition={termsAndCondition}/>

       <HStack>
        <RiSecurePaymentFill/>
        <Heading 
          size={'xs'} 
          fontFamil="sans-serif" 
          textTransform={'upperCase'} 
          children="Payment is secure by Razorpay"/>
       </HStack>
    </Container>
  )
}

export default About