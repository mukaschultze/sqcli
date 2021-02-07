#!/usr/bin/env node
import chalk from "chalk";
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
    --init    ${chalk.green("Generates SQCLI configuration file")}
    --model   ${chalk.green("Loads configuration of <name>.sqcli.js file")}

	Examples
    $ sqcli --init

    $ sqcli --model user
`,
  {
    flags: {
      init: {
        type: "boolean",
      },
      model: {
        type: "string",
      },
    },
  }
);

parameterHandler(cli);

render(<App />);
