import * as fs from "fs";

const FILENAME = "./sqcli.config.json";

async function writeConfigFile() {
  try {
    await fs.promises.writeFile(
      FILENAME,
      JSON.stringify(
        {
          database: {
            driver: "sqlite3",
            host: "127.0.0.1",
            user: "root",
            password: undefined,
            port: "443",
          },
        },
        null,
        2
      )
    );
  } catch (err) {
    throw new Error("Couldn't generate configuration file");
  }
}

export default async () => {
  let file = await fs.promises.readFile(FILENAME);

  if (file) {
    // TODO: Ask if wanna override file then writeConfigFile();
  } else {
    writeConfigFile();
  }

  process.exit(1);
};
