import { writeFile } from "fs";

export default () => {
  writeFile(
    "./sqcli.config.json",
    JSON.stringify(
      {
        client: "sqlite3",
        host: "127.0.0.1",
        user: "root",
        password: undefined,
        port: "443",
      },
      null,
      2
    ),
    (err) => {
      if (err) console.log(err);

      console.log("File generated successfully!");
      process.exit(1);
    }
  );
};
