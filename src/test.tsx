import test from "ava";
import chalk from "chalk";
import { render } from "ink-testing-library";
import React from "react";
import { App } from "./app";

test("greet unknown user", (t) => {
  const { lastFrame } = render(<App />);

  t.is(lastFrame(), chalk`Hello, {green Stranger}`);
});

test("greet user with a name", (t) => {
  const { lastFrame } = render(<App />);

  t.is(lastFrame(), chalk`Hello, {green Jane}`);
});
