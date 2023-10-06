import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import cursor from "../../../assets/images/cursor.png"
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { Doughnutchart, LineChart } from './Chart'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../../redux/actions/adminAction'
import Loader from '../../Layout/Loader/Loader'


const Detabox = ({ title, qty, profit, qtyPercentage }) => (
    <Box w={['full', '20%']} boxShadow={'-2px 0 10px rgba(107, 70 , 193,0.5)'} p={'8'} borderRadius={'lg'}>


        <Text children={title} />

        <HStack spacing={'6'}>

            <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />

            <HStack>
                <Text children={`${qtyPercentage}%`} />
                {profit ? (
                    <RiArrowUpLine color='green' />

                ) : (
                    <RiArrowDownLine color='red' />


                )}
            </HStack>

        </HStack>

        <Text opacity={0.6} children={'Since Last Month'} />
    </Box>
)

const Bar = ({ title, value, profit }) => (
    <Box py={'4'} px={['0', '16']}>

        <Heading size={'sm'} children={title} mb={'2'} />
        <HStack w={'full'} alignItems={'center'}>
            <Text children={profit ? '0%' : `-${value}%`} />
            <Progress w={'full'} value={profit ? value : 0} />
            <Text children={`${value > 100 ? value : 100}%`} />
        </HStack>
    </Box>
)

const Dashboard = () => {

    const dispatch = useDispatch();
    const {
        loading,
        stats,
        viewsCount,
        subscriptionCount,
        usersCount,
        subscriptionPercentage,
        viewsPercentage,
        usersPercentage,
        subscriptionProifit,
        viewsProifit,
        usersProifit,
    } = useSelector(state=> state.admin)

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    return (
        <Grid
            css={{ cursor: `url(${cursor}), default` }}
            minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}
        >
            {loading || !stats ? <Loader color='purple.500' /> : (
                <Box boxSizing='border-box' py={'12'} px={['4', '0']}>
                    <Text textAlign={'center'} opacity={0.5} children={`Last change was on ${String(new Date(stats[11].createdAt)).split('G')[0]}`} />
                    <Heading
                        children='Dashboard'
                        ml={['0', '16']}
                        mb={'16'}
                        textAlign={['center', 'left']}
                    />

                    <Stack
                        direction={['column', 'row']}
                        minH='24'
                        justifyContent={['space-evenly']}
                    >
                        <Detabox title='Views' qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProifit} />
                        <Detabox title='Users' qty={usersCount} qtyPercentage={usersPercentage} profit={usersPercentage} />
                        <Detabox title='Subscription' qty={subscriptionCount} qtyPercentage={subscriptionPercentage} profit={subscriptionProifit} />
                    </Stack>
                    <Box
                        m={['0', '12']}
                        borderRadius={'lg'}
                        p={['0', '12']}
                        mt={['4', '12']}
                        boxShadow={'-2px 0 10px rgba(107, 70 , 193,0.5)'}
                    >
                        <Heading
                            textAlign={['center', 'left']}
                            size={'md'}
                            children='Views Graph'
                            pt={['8', '0']}
                            ml={['0', '12']}
                        />

                        <LineChart views={stats.map(item => item.views)}/>
                    </Box>

                    <Grid templateColumns={['1fr', '2fr 1fr']}>
                        <Box p={'4'}>
                            <Heading
                                textAlign={['center', 'left']}
                                size={'md'}
                                children='Progress Bar'
                                my={'8'}
                                ml={['0', '16']}
                            />
                            <Box>
                                <Bar profit={viewsProifit} title='Views' value={viewsPercentage} />
                                <Bar profit={usersProifit} title='Users' value={usersPercentage} />
                                <Bar profit={subscriptionProifit} title='Subscription' value={subscriptionPercentage} />
                            </Box>
                        </Box>

                        <Box p={['0', '12']} boxSizing='border-box'>

                            <Heading
                                textAlign={'center'}
                                size={'md'}
                                mb={'4'}
                                children='Users'
                            />
                            <Doughnutchart users={[subscriptionCount,usersCount-subscriptionCount]}/>
                        </Box>

                    </Grid>
                </Box>
            )}
            <Sidebar />
        </Grid>
    )
}

export default Dashboard