import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"

test('demo test', () => {
  expect(1 + 1).toBe(2);
});

test('Renders App', () => {
    render(<App />)
    expect(true).toBeTruthy()
})