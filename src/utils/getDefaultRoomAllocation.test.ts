import { getDefaultRoomAllocation, Room } from "utils/getDefaultRoomAllocation.ts"
import { expect, describe, it } from "@jest/globals"

describe("getDefaultRoomAllocation", () => {
  it("should correctly allocate rooms for 4 adults and 2 children", () => {
    const guest = { adult: 4, child: 2 }
    const rooms: Room[] = [
      {
        id: "1",
        roomPrice: 1000,
        adultPrice: 200,
        childPrice: 100,
        capacity: 4,
      },
      { id: "2", roomPrice: 0, adultPrice: 500, childPrice: 500, capacity: 4 },
      {
        id: "3",
        roomPrice: 500,
        adultPrice: 300,
        childPrice: 200,
        capacity: 4,
      },
    ]
    const result = getDefaultRoomAllocation({ rooms, guest })
    expect(result).not.toBeNull()
    expect(result.totalPrice).toEqual(2900)
  })

  it("should correctly allocate rooms for 16 adults and 0 children", () => {
    const guest = { adult: 16, child: 0 }
    const rooms: Room[] = [
      {
        id: "1",
        roomPrice: 500,
        adultPrice: 500,
        childPrice: 300,
        capacity: 4,
      },
      {
        id: "2",
        roomPrice: 500,
        adultPrice: 500,
        childPrice: 300,
        capacity: 4,
      },
      { id: "3", roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
      {
        id: "4",
        roomPrice: 500,
        adultPrice: 1000,
        childPrice: 600,
        capacity: 2,
      },
    ]
    const result = getDefaultRoomAllocation({ rooms, guest })
    expect(result).not.toBeNull()
    expect(result.totalPrice).toEqual(9000)
  })

  it("should correctly allocate rooms for 0 adults and 1 child", () => {
    const guest = { adult: 0, child: 1 }
    const rooms: Room[] = [
      {
        id: "1",
        roomPrice: 1000,
        adultPrice: 500,
        childPrice: 300,
        capacity: 2,
      },
      {
        id: "2",
        roomPrice: 500,
        adultPrice: 400,
        childPrice: 300,
        capacity: 4,
      },
      { id: "3", roomPrice: 0, adultPrice: 500, childPrice: 300, capacity: 8 },
    ]
    const result = getDefaultRoomAllocation({ rooms, guest })
    expect(result.totalPrice).toEqual(0)
  })
})
