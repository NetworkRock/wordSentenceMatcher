import React from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import checkLCS from "src/api/checkLCS";

// Part 1
const unmockedFetch = global.fetch;

// Part 3
afterEach(() => {
  global.fetch = unmockedFetch;
});

describe("App", () => {
  test("renders the headerText", () => {
    render(<App />);
    const headerText = screen.getByText(/Find matches in words and sentences/i);
    expect(headerText).toBeInTheDocument();
  });

  test("renders both textareas", () => {
    render(<App />);
    const firstTextarea = screen.getAllByRole("textbox")[1];
    const secondTextarea = screen.getAllByRole("textbox")[0];
    expect(firstTextarea).toBeInTheDocument();
    expect(secondTextarea).toBeInTheDocument();
  });

  test("change text in both textareas", async () => {
    global.fetch = () =>
    // @ts-ignore
      Promise.resolve({
        json: () =>
          Promise.resolve({
            numberOverlapping: 3,
            charactersOverlapping: "ice",
          }),
      });
    render(<App />);
    const firstTextarea = screen.getByRole("textbox", {
      name: "searchTextbox",
    });
    const secondTextarea = screen.getByRole("textbox", { name: "text" });
    const findMatchBtn = screen.getByRole("button", { name: "Find matches" });
    await act(async () => {
      await userEvent.type(firstTextarea, "device");
      await userEvent.type(secondTextarea, "ice");
      await userEvent.click(findMatchBtn);
    });

    let solutionTextbox;
    await waitFor(() => {
      solutionTextbox = screen.getByRole("textbox", {
        name: "solutionTextbox",
      });
      expect(solutionTextbox).toBeInTheDocument();
    });
    expect(solutionTextbox).toHaveValue("ice");
    expect(firstTextarea).toHaveValue("device");
    expect(secondTextarea).toHaveValue("ice");
  });

  test("show backend error on failure", async () => {
    global.fetch = () =>
    // @ts-ignore
      Promise.resolve({
        json: () =>
          Promise.reject({
            message: "custom error",
          }),
      });
    render(<App />);
    const findMatchBtn = screen.getByRole("button", { name: "Find matches" });
    await act(async () => {
      await userEvent.click(findMatchBtn);
    });

    let errorMessage;
    await waitFor(() => {
      errorMessage = screen.getByText("custom error");
      expect(errorMessage).toBeInTheDocument();
    });
    const errorTitle = screen.getByText("OOOOPPPPPS...");
    expect(errorTitle).toBeInTheDocument();
  });

  test("check the longest common subsequence of two strings", () => {
    expect(checkLCS("rhinoceros", "orange")).toStrictEqual({
      numberOverlapping: 3,
      charactersOverlapping: "rne",
    });
  });
});
