import { default as Knex, default as knex } from "knex";
import { Observable } from "rxjs";
import { shareReplay } from "rxjs/operators";

export const Database = new Observable<Knex>((sub) => {
  const pg = knex({
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database.sqlite",
    },
    debug: false,
    log: {
      debug: (message) => console.debug("debug", message),
      deprecate: (message) => console.warn("deprecate", message),
      error: (message) => console.error("error", message),
      warn: (message) => console.warn("warn", message),
      enableColors: true,
    },
  });

  sub.next(pg);

  return () => pg.destroy();
}).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
