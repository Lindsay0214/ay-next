import { useEffect, useState } from 'react'
import RoomAllocation from '../components/RoomAllocation'
import { Box, Spinner } from '@chakra-ui/react'
import { Guest, Room } from 'utils/getDefaultRoomAllocation.ts'

const Home = () => {
  const [guest, setGuest] = useState<Guest>()
  const [rooms, setRooms] = useState<Room[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setGuest({ adult: 4, child: 2 })
      setRooms([
        {
          id: '1',
          capacity: 4,
          roomPrice: 1000,
          adultPrice: 200,
          childPrice: 100,
        },
        {
          id: '2',
          capacity: 4,
          roomPrice: 1200,
          adultPrice: 500,
          childPrice: 500,
        },
        {
          id: '3',
          capacity: 4,
          roomPrice: 1100,
          adultPrice: 300,
          childPrice: 200,
        },
      ])
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <Box textAlign="center" py={10} px={6}>
      {loading && <Spinner />}
      {!loading && !rooms && <Box>目前尚無空房</Box>}
      {!loading && !guest && <Box>請先選擇欲分配人數</Box>}
      {!loading && guest && rooms && (
        <RoomAllocation
          guest={guest}
          rooms={rooms}
          onChange={(result) => console.log(result)}
        />
      )}
    </Box>
  )
}

export default Home
