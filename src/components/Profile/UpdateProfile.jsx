import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profileAction';
import { loadUser } from '../../redux/actions/userAction';

const UpdateProfile = ({user}) => {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const dispatch = useDispatch();

    const updateHandler = async(e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email));
        dispatch(loadUser());
    }

    const {loading} = useSelector(state=>state.profile);

    return (
        <Container padding={'16'} minH={'90vh'}>

            <form onSubmit={updateHandler}>
                <Heading
                    children="Update Profile"
                    my={'12'}
                    textAlign={['center', 'left']}
                    textTransform={'upperCase'}
                />
                <VStack>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        type="text"
                        focusBorderColor='yellow.500'
                    />

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        focusBorderColor='yellow.500'
                    />
                    <Button isLoading={loading} w={'full'} colorScheme='yellow' type='submit'>
                        Update
                    </Button>
                </VStack>
            </form>

        </Container>
    )
}

export default UpdateProfile