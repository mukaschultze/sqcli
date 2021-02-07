import { Box, Text } from "ink";
import React, { FC } from "react";
import { TableView } from "./table-view";

export const App: FC = () => {
  return (
    <Box flexDirection="column">
      <TableView blackListColumns={[]} />
      <Box marginX={4}>
        <Text color="grey">
          ←→ Select Column | ↓↑ Move offset | &lt;&gt; Increase limit | [enter]
          Order by selected column
        </Text>
      </Box>
    </Box>
  );
};
