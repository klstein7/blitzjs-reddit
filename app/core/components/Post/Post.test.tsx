import { render } from "test/utils"

import Post from "./Post"
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

const post = {
  id: "1",
  title: "Test post",
  url: "https://www.google.com",
  body: "",
  createdAt: new Date(),
  userId: 1,
  user: {
    id: 1,
    email: "test@test.com",
    name: "Test",
  },
}

describe("Post", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<Post post={post} />)
    }).not.toThrow()
  })
})
