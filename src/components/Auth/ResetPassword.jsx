import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profileAction';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const params = useParams();
    const token = params.token;
    const navigate = useNavigate();

    const {loading, message, error} = useSelector(state=>state.profile);
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
       e.preventDefault();
       dispatch(resetPassword(token,password));
    };

    useEffect(() => {
      if(error){
        toast.error(error);
        dispatch({type :'clearError'})
      }

      if(message){
        toast.success(message);
        dispatch({type :'clearMessage'})
        navigate('/login');
      }
    }, [dispatch, error, message, navigate]);

    return (
        <Container padding={'14'} height={'100vh'}>
            <form onSubmit={submitHandler}>
                <Heading
                    children="Reset Password"
                    my="14"
                    textTransform={'upperCase'}
                    textAlign={['center', 'left']}
                />
                <VStack spacing={"8"}>
                    <Input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
                        type="password"
                        focusBorderColor='yellow.500'
                    />
                    <Button isLoading={loading} type='submit' width={'full'} colorScheme='yellow' >
                        Reset Password
                    </Button>
                </VStack>
            </form>
        </Container>
    )
}

export default ResetPassword;