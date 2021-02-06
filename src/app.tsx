import React, { FC } from "react";
import { Table } from "./table";

export const App: FC = () => (
  <Table
    data={[
      {
        teste: "OI",
        b: "Teste",
      },
    ]}
  />
);
