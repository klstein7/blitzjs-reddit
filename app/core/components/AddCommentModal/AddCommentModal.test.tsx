import { render } from "test/utils"

import AddCommentModal from './AddCommentModal'
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

describe('AddCommentModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddCommentModal />)
    }).not.toThrow()
  })
})
