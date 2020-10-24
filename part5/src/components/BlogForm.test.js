import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"

test("<BlogForm /> calls onSubmit", () => {
  const createBlog = jest.fn()
  const component = render(<BlogForm createBlog={createBlog} />)

  const input = component.container.querySelector("#title")
  const form = component.container.querySelector("form")
  fireEvent.change(input, {
    target: { value: "test title" },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
})
