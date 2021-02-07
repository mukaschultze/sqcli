import { Box, Text } from "ink";
import React, { FC } from "react";
import { LoadingIndicator } from "./loading-indicator";
import { TableView, useLoading } from "./table-view";

export const App: FC = () => {
  const loading = useLoading();

  return (
    <Box flexDirection="column">
      <TableView blackListColumns={[]} />
      <Box marginX={1}>
        <Box minWidth={3} marginX={2}>
          {loading && <LoadingIndicator />}
        </Box>
        <Text color="grey">
          ←→ Select Column | ↓↑ Move offset | &lt;&gt; Increase limit | [enter]
          Order by selected column
        </Text>
      </Box>
    </Box>
  );
};
