import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../redux/actions/courseAction'
import toast from 'react-hot-toast'
import { addToPlayList } from '../../redux/actions/profileAction'
import { loadUser } from '../../redux/actions/userAction'

const Course = ({ views, title, imgSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imgSrc} boxSize={"60"} objectFit={'container'} />
            <Heading
                textAlign={["center", "left"]}
                size={'sm'}
                maxW="200px"
                fontFamily={"sans-serif"}
                noOfLines={3}
                children={title}
            />
            <Text noOfLines={2} children={description} />
            <HStack>
                <Text
                    fontWeight={'bold'}
                    textTransform="upperCase"
                    children={"Creator"}
                />
                <Text
                    fontFamily={'body'}
                    textTransform="upperCase"
                    children={creator}
                />
            </HStack>
            <Heading
                textAlign={"center"}
                size={'xs'}
                children={`Lectures - ${lectureCount}`}
                textTransform="upperCase"
            />
            <Heading
                size={'xs'}
                children={`Views - ${views}`}
                textTransform="upperCase"
            />

            <Stack direction={["column", "row"]} alignItems="center">
                <Link to={`/course/${id}`}>
                    <Button colorScheme='yellow'>Watch Now</Button>
                </Link>
                <Button
                    isLoading={loading}
                    variant={'ghost'}
                    colorScheme='yellow'
                    onClick={() => addToPlaylistHandler(id)}
                >
                    Add to playlist
                </Button>
            </Stack>
        </VStack>
    )
}


const Courses = () => {

    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    const addToPlaylistHandler = async courseId => {
       await dispatch(addToPlayList(courseId));
       dispatch(loadUser());
    }

    const categories = [
        "Web development",
        "Artificial Intellegence",
        "Data Structure & Algorithm",
        "App Development",
        "Data Science",
        "Game Development"
    ];

    const { loading, courses, error , message} = useSelector(state => state.course)

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if (error) {
            toast.error(error);
            dispatch({ type: "clearError" });
        }

        
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }

    }, [category, keyword, dispatch, error, message]);

    return (
        <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
            <Heading children="All Courses" m={'8'} />
            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search a course....'
                type={'text'}
                focusBorderColor='yellow.500'
            />
            <HStack
                overflowX={'auto'}
                paddingY="8"
                css={{
                    "&::-webkit-scrollbar": {
                        display: 'none',
                    },
                }}>
                {
                    categories.map((cate, index) => {
                        return (
                            <Button key={index} onClick={() => setCategory(cate)} minW={"60"}>
                                <Text children={cate} />
                            </Button>
                        )
                    })
                }
            </HStack>

            <Stack
                direction={["column", "row"]}
                flexWrap="wrap"
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >
                {
                    courses.length > 0 ?
                     courses.map((item) => (
                        <Course
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            views={item.views}
                            imgSrc={item.poster.url}
                            id={item._id}
                            creator={item.createdBy}
                            lectureCount={item.numOfVideos}
                            addToPlaylistHandler={addToPlaylistHandler}
                            loading={loading}
                        />
                    )):(
                        <Heading mt={'4'} children={'Courses Not Found'}/>
                    )
                }
            </Stack>
        </Container>
    )
}

export default Courses