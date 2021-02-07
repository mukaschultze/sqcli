#!/usr/bin/env node
import { render } from "ink";
import meow from "meow";
import React from "react";
import { App } from "./app";
import parameterHandler from "./helpers/parameterHandler";

const cli = meow(
  `
	Usage
	  $ sqcli

	Options
    --init  Generates config file

	Examples
    $ sqcli --init
`,
  {
    flags: {
      init: {
        type: "string",
        default: "true",
      },
    },
  }
);

parameterHandler(cli);

render(<App />);
