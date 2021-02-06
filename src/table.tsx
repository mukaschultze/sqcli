import { Text } from "ink";
import * as InkTable from "ink-table";
import React, { FC } from "react";

export interface TableProps {
  data: any[];
}

export const Table: FC<TableProps> = ({ data }) => (
  <InkTable.default data={data} cell={Cell as any} header={Header as any} />
);

export const Header: FC = ({ children }) => <Text>{children}</Text>;

export const Cell: FC = ({ children }) => <Text>{children}</Text>;
