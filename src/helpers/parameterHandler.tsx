import { Result } from "meow";
import init from "./init";
import model from "./model";

export default (
  cli: Result<{
    init: {
      type: "boolean";
    };
    model: {
      type: "string";
    };
  }>
) => {
  if (cli.flags.init) {
    init();
  }

  if (cli.flags.model) {
    model(cli.flags.model);
  }
};
