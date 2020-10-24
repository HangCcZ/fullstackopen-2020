import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

describe("<Blog/>", () => {
  let component
  let clickLike
  beforeEach(() => {
    clickLike = jest.fn()
    const blog = {
      author: "Hang",
      title: "Hang's vlog",
      likes: 666,
      user: {
        id: "ana",
      },
      url: "www.google.com",
    }

    const user = {
      id: "ana",
    }
    component = render(<Blog blog={blog} user={user} clickLike={clickLike} />)
  })

  test("renders the blog's title and author, but does not render its url or number of likes by default", () => {
    expect(component.container).not.toHaveTextContent(666)
  })

  test("renders the blog's title and author, but does not render its url or number of likes by default", () => {
    expect(component.container).toHaveTextContent("Hang's vlog")
  })

  test("checks that the blog's url is shown when the button controlling the shown details has been clicked.", () => {
    const button = component.getByText("view")
    fireEvent.click(button)

    expect(component.container).toHaveTextContent("www.google.com")
  })

  test("checks that the number of likes is shown when the button controlling the shown details has been clicked.", () => {
    const button = component.getByText("view")
    fireEvent.click(button)

    expect(component.container).toHaveTextContent("likes")
  })

  test(" if the like button is clicked twice, the event handler the component received as props is called twice.", () => {
    // expand the detailed view first
    const viewButton = component.getByText("view")
    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector(".likeButton")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(clickLike.mock.calls).toHaveLength(2)
  })
})
