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
  });

  sub.next(pg);

  return () => pg.destroy();
}).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
