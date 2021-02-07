import { Result } from "meow";
import init from "./init";

export default (
  cli: Result<{
    init: {
      type: "string";
      default: string;
    };
  }>
) => {
  if (cli.flags.init) {
    init();
  }
};
