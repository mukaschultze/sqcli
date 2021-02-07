import { bind } from "@react-rxjs/core";
import { Box, Text, useFocus, useFocusManager, useInput } from "ink";
import React, { FC } from "react";
import { BehaviorSubject, combineLatest, from, Subject, timer } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { Database } from "./db/connection";

const orderBySubject = new BehaviorSubject<
  { column: string; order: "asc" | "desc" } | undefined
>(undefined);
const setOrderBy = (column: string | undefined) =>
  orderBySubject.next(
    column
      ? column === orderBySubject.value?.column
        ? orderBySubject.value.order == "asc"
          ? { column, order: "desc" }
          : { column, order: "asc" }
        : { column, order: "asc" }
      : undefined
  );
const [useOrderBy, orderBy$] = bind(orderBySubject, undefined);

const offsetSubject = new Subject<number>();
const setOffset = (offset: number) => offsetSubject.next(Math.max(offset, 0));
const [useOffset, offset$] = bind(offsetSubject, 0);

const limitSubject = new Subject<number>();
const setLimit = (limit: number) => limitSubject.next(Math.max(limit, 1));
const [useLimit, limit$] = bind(limitSubject, 25);

const [useData] = bind(
  combineLatest([Database, limit$, offset$, orderBy$, timer(0, 2000)]).pipe(
    debounceTime(300),
    switchMap(([knex, limit, offset, orderBy]) => {
      let qb = knex
        .queryBuilder()
        .select("*")
        .from("invoices")
        .offset(offset)
        .limit(limit);

      // let qb = knex
      //   .queryBuilder()
      //   .select("name")
      //   .from("sqlite_master")
      //   .where("type", "=", "table");

      if (orderBy) qb = qb.orderBy(orderBy.column, orderBy.order);

      return from(qb.then());
    })
  ),
  []
);

export const TableView: FC<{ blackListColumns?: string[] }> = ({
  blackListColumns,
}) => {
  const data = useData();
  const limit = useLimit();
  const offset = useOffset();
  const columnNames = getKeys(data);
  const { focusPrevious, focusNext } = useFocusManager();

  useInput((input, key) => {
    if (input == ",") {
      setLimit(limit - 1);
    }
    if (input == ".") {
      setLimit(limit + 1);
    }
    if (key.downArrow) {
      setOffset(offset + 1);
    }
    if (key.upArrow) {
      setOffset(offset - 1);
    }
    if (key.leftArrow) {
      focusPrevious();
    }
    if (key.rightArrow) {
      focusNext();
    }
  });

  return (
    <Box>
      {columnNames
        .filter(
          (col) => !blackListColumns || blackListColumns.indexOf(col) === -1
        )
        .map((col, idx) => (
          <Column data={data} key={idx} columnKey={col} />
        ))}
    </Box>
  );
};

export const Column: FC<{
  columnName?: string;
  columnKey: string;
  data: any[];
}> = ({ columnName, columnKey, data }) => {
  const { isFocused } = useFocus();
  const orderBy = useOrderBy();

  useInput((input, key) => {
    if (isFocused && key.return) {
      setOrderBy(columnKey);
    }
  });

  return (
    <Box
      flexDirection="column"
      borderStyle={isFocused ? "single" : undefined}
      marginRight={1}
      marginY={isFocused ? 0 : 1}
      flexBasis={15}
      flexShrink={isFocused ? 0 : 1}
      flexGrow={1}
    >
      <Box>
        <Text bold={true} wrap="truncate-end">
          <Text color="cyan">
            {orderBy?.column == columnKey
              ? orderBy.order === "asc"
                ? "↓"
                : "↑"
              : " "}
          </Text>
          {columnName ?? columnKey}
        </Text>
      </Box>
      {data.map((row, rowIdx) => (
        <Cell cellValue={row[columnKey]} key={rowIdx}></Cell>
      ))}
    </Box>
  );
};

export const Cell: FC<{ cellValue: any }> = ({ cellValue }) => (
  <Box>
    <Text wrap="truncate-end">
      {cellValue === undefined ? (
        <Text color="red">undefined</Text>
      ) : cellValue === null ? (
        <Text color="red">null</Text>
      ) : cellValue instanceof Date ? (
        <Text color="blue">Date</Text>
      ) : typeof cellValue === "object" ? (
        <Text color="blue">JSON</Text>
      ) : typeof cellValue === "number" ? (
        <Text color="yellow">{cellValue}</Text>
      ) : (
        <Text>{cellValue?.toString?.() || " "}</Text>
      )}
    </Text>
  </Box>
);

const getKeys = (obj: any[]) =>
  Object.keys(obj.reduce((cur, acc) => ({ ...cur, ...acc }), {}));
