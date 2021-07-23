import { render } from "test/utils"

import PostList from "./PostList"
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

describe("PostList", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<PostList />)
    }).not.toThrow()
  })
})
