import React from 'react'
import { ColorModeSwitcher } from '../../../ColorModeSwitcher'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure } from '@chakra-ui/react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/userAction'

const LinkButton = ({ url = '/', title = 'Home' , onClose}) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
)


const Header = ({isAuthenticated = false, user}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const LogoutHandler = () => {
    
    onClose();
    dispatch(logout());
  }

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width='12'
        height={'12'}
        rounded='full'
        position={'fixed'}
        top='6'
        left='6'
        zIndex={1}
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}>LEARN WITH US</DrawerHeader>
            <DrawerBody>
              <VStack spacing={'4'} alignItems="flex-start">
                <LinkButton onClose={onClose} url='/' title='Home' />
                <LinkButton onClose={onClose} url='/courses' title='Browse All Courses' />
                <LinkButton onClose={onClose} url='/request' title='Request All Courses' />
                <LinkButton onClose={onClose} url='/contact' title='Contact Us' />
                <LinkButton onClose={onClose} url='/about' title='About' />
                <HStack justifyContent={'space-evenly'} position="absolute" bottom={'2rem'} width='80%' >
                  {isAuthenticated ?
                    (
                      <>
                        <VStack>
                          <HStack>
                            <Link to='/profile' onClick={onClose}>
                              <Button variant={'ghost'} colorScheme={'yellow'}>
                                Profile
                              </Button>
                              <Button variant={'ghost'} onClick={LogoutHandler}>
                                <RiLogoutBoxLine />
                                Logout
                              </Button>
                            </Link>
                          </HStack>
                          {user && user.role === 'admin' && (
                            <Link to='/admin/dashboard' onClick={onClose}>
                              <Button colorScheme={'purple'} variant='ghost'>
                                <RiDashboardFill style={{margin: '4px'}}/>
                                Dashboard
                              </Button>
                            </Link>
                          )}
                        </VStack>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={onClose}>
                          <Button colorScheme={'yellow'}>Login</Button>
                        </Link>
                        <p>OR</p>
                        <Link to="/register" onClick={onClose}>
                          <Button colorScheme={'yellow'}>Sign Up</Button>
                        </Link>
                      </>
                    )}

                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default Header