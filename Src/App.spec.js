import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/* In here please contirbute a test that will
verify that your form is logging to the console */

it("should have NewDay as text", () => {
  const { queryByText } = render(<App />);
  expect(queryByText(/NewDay/)).toBeTruthy();
});

it("should have 'Name' as text when open modal button is clicked ", () => {
  const { queryByText, getByText } = render(<App />);
  expect(queryByText(/Name:/)).toBeFalsy();

  fireEvent.click(getByText(/Open Modal/));
  expect(queryByText(/Name:/)).toBeTruthy();
});

it("Simulates selection", () => {
  const { getByText, getByTestId, getAllByTestId } = render(<App />);
  fireEvent.click(getByText(/Open Modal/));

  fireEvent.change(getByTestId("select"), { target: { value: "Typescript" } });
  let options = getAllByTestId("select-option");
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
  expect(options[2].selected).toBeFalsy();
});

it("on ESC key press", () => {
  const { container, getByText, queryByTestId } = render(<App />);
  expect(queryByTestId("select")).toBeFalsy();
  fireEvent.click(getByText(/Open Modal/));
  expect(queryByTestId("select")).toBeTruthy();
  fireEvent.keyDown(container, {
    key: "Escape",
    code: "Escape",
    keyCode: 27
  });
  expect(queryByTestId("select")).toBeFalsy();
});

it("focus stays inside modal", () => {
  const { getByText, queryByTestId } = render(<App />);
  fireEvent.click(getByText(/Open Modal/));
  const btn = queryByTestId("modal-close-btn");
  const input = queryByTestId("name");
  const select = queryByTestId("select");

  expect(select).toBeTruthy();
  userEvent.tab();
  expect(document.activeElement).toEqual(btn);
  userEvent.tab();
  expect(document.activeElement).toEqual(input);
  userEvent.tab();
  expect(document.activeElement).toEqual(select);
  userEvent.tab();
  expect(document.activeElement).toEqual(btn);
});
