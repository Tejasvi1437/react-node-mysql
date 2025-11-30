import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  it("counter displays correct initial count", () => {
    render(<Counter initialCount={0} />);
    const countValue = Number(screen.getByTestId("count").textContent);
    expect(countValue).toEqual(0);
  });

  it("count should increment by 1 if the increment button is clicked", () => {
    render(<Counter initialCount={0} />);
    const incrementBtn = screen.getByRole("button", { name: "Increment" });

    expect(Number(screen.getByTestId("count").textContent)).toEqual(0);

    fireEvent.click(incrementBtn);

    expect(Number(screen.getByTestId("count").textContent)).toEqual(1);
  });

  it("count should decrement by 1 if the decrement button is clicked", () => {
    render(<Counter initialCount={0} />);
    const decrementBtn = screen.getByRole("button", { name: "Decrement" });

    expect(Number(screen.getByTestId("count").textContent)).toEqual(0);

    fireEvent.click(decrementBtn);

    expect(Number(screen.getByTestId("count").textContent)).toEqual(-1);
  });

  it("count should be 0 if the restart button is clicked", () => {
    render(<Counter initialCount={50} />);
    const restartBtn = screen.getByRole("button", { name: "Restart" });

    expect(Number(screen.getByTestId("count").textContent)).toEqual(50);

    fireEvent.click(restartBtn);

    expect(Number(screen.getByTestId("count").textContent)).toEqual(0);
  });

  it("count should invert signs if the switch signs button is clicked", () => {
    render(<Counter initialCount={50} />);
    const switchBtn = screen.getByRole("button", { name: "Switch Signs" });

    expect(Number(screen.getByTestId("count").textContent)).toEqual(50);

    fireEvent.click(switchBtn);

    expect(Number(screen.getByTestId("count").textContent)).toEqual(-50);
  });
});
