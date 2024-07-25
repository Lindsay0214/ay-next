export type Room = {
  id: string
  capacity: number
  roomPrice: number
  adultPrice: number
  childPrice: number
}

export type Guest = {
  adult: number
  child: number
}

export type Allocation = {
  adults: number
  children: number
  price: number
}

export type DefaultRoomAllocationProps = {
  rooms: Room[]
  guest: Guest
}

export function getDefaultRoomAllocation({
  rooms,
  guest,
}: DefaultRoomAllocationProps) {
  const notAllocatable = {
    allocations: rooms.map((room) => ({
      adults: 0,
      children: 0,
      price: room.roomPrice,
    })),
    totalPrice: 0,
  }
  const sortedRooms = rooms.sort(
    (a, b) =>
      a.roomPrice +
      a.adultPrice +
      a.childPrice -
      (b.roomPrice + b.adultPrice + b.childPrice)
  )

  let remainingAdults = guest.adult
  let remainingChildren = guest.child
  if (remainingAdults === 0 && remainingChildren > 0) return notAllocatable

  const allocations: Allocation[] = sortedRooms.reduce((allocations, room) => {
    let allocatedAdults = 0
    let allocatedChildren = 0
    if (remainingChildren > 0) {
      allocatedChildren = Math.min(room.capacity - 1, remainingChildren)
      allocatedAdults = Math.min(
        1 + remainingChildren - allocatedChildren,
        remainingAdults
      )
    } else {
      allocatedAdults = Math.min(room.capacity, remainingAdults)
    }

    remainingAdults -= allocatedAdults
    remainingChildren -= allocatedChildren

    const totalPrice =
      room.roomPrice +
      allocatedAdults * room.adultPrice +
      allocatedChildren * room.childPrice

    return [
      ...allocations,
      {
        adults: allocatedAdults,
        children: allocatedChildren,
        price: totalPrice,
      },
    ]
  }, [] as Allocation[])

  const totalAllocated = allocations.reduce(
    (sum, allocation) => sum + allocation.adults + allocation.children,
    0
  )
  const totalPrice = allocations.reduce((acc, val) => acc + val.price, 0)

  if (totalAllocated < guest.adult + guest.child) return notAllocatable
  return {
    allocations,
    totalPrice,
  }
}
