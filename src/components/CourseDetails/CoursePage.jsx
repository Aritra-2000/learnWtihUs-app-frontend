import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/courseAction';
import Loader from '../Layout/Loader/Loader';

const CoursePage = ({ user }) => {

    const [lectureNumber, setLectureNumber] = useState(0);

    const { lectures, loading } = useSelector(state => state.course);

    const dispstch = useDispatch();
    const params = useParams();

    useEffect(() => {

        dispstch(getCourseLectures(params.id));

    }, [dispstch, params.id])

    if (user.role !== 'admin' && (user.subscription === undefined || user.subscription.status !== 'active')) {
        return <Navigate to={'/subscribe'} />;
    }


    return (
        loading ? <Loader /> : (
            <Grid minH={'100vh'} templateColumns={['1fr', '3fr 1fr']}>
                {lectures && lectures.length > 0 ? (
                    <>
                        <Box>
                            <video
                                width={'100%'}
                                controls
                                controlsList="nodownload nofullscreen noremoteplayback"
                                disablePictureInPicture
                                disableRemotePlayback
                                src={lectures[lectureNumber].video.url}
                            ></video>

                            <Heading m={'4'} children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`} />
                            <Heading m="4" children={lectures[lectureNumber].description} />
                            <Text m={'4'} children={'Adssrssss sssdd adafd'} />
                        </Box>
                        <VStack>
                            {lectures.map((item, index) => (
                                <Button
                                    onClick={() => setLectureNumber(index)}
                                    key={item._id}
                                    style={{
                                        width: "100%",
                                        padding: "1.5rem",
                                        textAlign: "center",
                                        margin: 0,
                                        borderBottom: "1px solid rgba(0,0,0,0.2)",

                                    }}
                                >
                                    <Text noOfLines={1}>
                                        #{index + 1} {item.title}
                                    </Text>
                                </Button>
                            ))}
                        </VStack>
                    </>
                ) : (
                    <Heading children={'No Lectures'}/>
                )}
            </Grid>
        )

    )
}

export default CoursePage