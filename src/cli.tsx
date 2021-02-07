#!/usr/bin/env node
import { render } from "ink";
import meow from "meow";
import React from "react";
import { App } from "./app";

const cli = meow(
  `
	Usage
	  $ sqcli

	Options
		--name  Your name

	Examples
	  $ sqcli --name=Jane
	  Hello, Jane
`,
  {
    flags: {
      name: {
        type: "string",
      },
    },
  }
);

render(<App />);
