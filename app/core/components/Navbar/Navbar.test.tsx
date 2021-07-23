import { render } from "test/utils"

import Navbar from "./Navbar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

jest.mock("app/core/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

// This is an example on how to mock api hooks when testing
// mockUseCurrentUser.mockReturnValue({
//   id: 1,
//   name: "User",
//   email: "user@email.com",
//   role: "user",
// })

describe("Navbar", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<Navbar />)
    }).not.toThrow()
  })
})
