import React, { useState } from "react"
import {
  Allocation,
  DefaultRoomAllocationProps,
  getDefaultRoomAllocation,
} from "utils/getDefaultRoomAllocation.ts"
import { Box, VStack, HStack, Text, Heading } from "@chakra-ui/react"
import CustomInputNumber from "components/CustomInputNumber.tsx"

type RoomAllocationProps = {
  onChange?: (allocations: Allocation[]) => void
} & DefaultRoomAllocationProps

const RoomAllocation = ({ guest, rooms, onChange }: RoomAllocationProps) => {
  const [allocation, setAllocation] = useState(
    () => getDefaultRoomAllocation({ guest, rooms }).allocations,
  )

  const handleInputChange = (index: number, type: string, value: number) => {
    const newAllocation: Allocation[] = [...allocation]

    const totalAdults =
      newAllocation.reduce((sum, room) => sum + room.adults, 0) -
      newAllocation[index].adults +
      (type === "adult" ? value : newAllocation[index].adults)
    const totalChildren =
      newAllocation.reduce((sum, room) => sum + room.children, 0) -
      newAllocation[index].children +
      (type === "child" ? value : newAllocation[index].children)

    if (totalAdults > guest.adult || totalChildren > guest.child) {
      return
    }

    if (type === "adult") newAllocation[index].adults = value
    if (type === "child")newAllocation[index].children = value
    newAllocation[index].price =
      rooms[index].roomPrice +
      newAllocation[index].adults * rooms[index].adultPrice +
      newAllocation[index].children * rooms[index].childPrice

    setAllocation(newAllocation)
    onChange && onChange(newAllocation)
  }

  const unallocatedAdults = guest.adult - allocation.reduce((sum, room) => sum + room.adults, 0)
  const unallocatedChildren = guest.child - allocation.reduce((sum, room) => sum + room.children, 0)

  return (
    <Box p={4} width="100%">
      <VStack width="100%" alignItems="start">
        <Heading as="h4" size="md">
          住客人數：{guest.adult} 位大人，{guest.child} 位小孩 / {rooms.length} 房
        </Heading>
        <Box
          px={5}
          mx={1}
          my={4}
          w="100%"
          h="66px"
          display="flex"
          alignItems="center"
          border="1px"
          borderColor="blue.200"
          borderRadius={5}
          backgroundColor="blue.50">
          尚未分配人數：
          {unallocatedAdults} 位大人，
          {unallocatedChildren} 位小孩
        </Box>
      </VStack>

      <VStack spacing={4} width="100%">
        {allocation.map((room, index) => (
          <VStack
            key={index}
            p={4}
            borderBottom="1px"
            borderColor="gray.200"
            width="100%"
            alignItems="start">
            <Heading size="sm" alignItems="start" mb={4}>
              房間可容納 {rooms[index].capacity} 人，目前已有{" "}
              {allocation[index].adults + allocation[index].children} 人
            </Heading>
            <HStack justifyContent="space-between" width="100%">
              <VStack whiteSpace="nowrap" alignItems="start">
                <Text>大人</Text>
                <Text fontSize="12px" color="gray.500">
                  年齡 20+
                </Text>
              </VStack>
              <Box>
                <CustomInputNumber
                  min={0}
                  max={Math.min(
                    rooms[index].capacity - allocation[index]?.children,
                    unallocatedAdults + allocation[index]?.adults,
                  )}
                  step={1}
                  name={`room-${index}-adult`}
                  value={allocation[index]?.adults || 0}
                  onChange={e => handleInputChange(index, "adult", e.target.value)}
                  disabled={!guest.adult || !unallocatedAdults}
                />
              </Box>
            </HStack>
            <HStack justifyContent="space-between" width="100%">
              <Box whiteSpace="nowrap">小孩</Box>
              <Box>
                <CustomInputNumber
                  min={0}
                  max={Math.min(
                    rooms[index].capacity - allocation[index]?.adults,
                    unallocatedChildren + allocation[index]?.children,
                  )}
                  step={1}
                  name={`room-${index}-child`}
                  value={allocation[index]?.children || 0}
                  onChange={e => handleInputChange(index, "child", +e.target.value)}
                  disabled={guest.child === 0 || !unallocatedChildren}
                />
              </Box>
            </HStack>
          </VStack>
        ))}
      </VStack>
    </Box>
  )
}

export default RoomAllocation
