import { Box, Text } from "ink";
import React, { FC, useEffect, useState } from "react";
import { timer } from "rxjs";

const frameList = [".", "o", "O", "O", "o", "."];

export const LoadingIndicator: FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const obs = timer(0, 100).subscribe(setFrame);
    return () => obs.unsubscribe();
  }, []);

  return (
    <Box>
      <Text color="cyan">
        {frameList[(frame + 2) % frameList.length]}
        {frameList[(frame + 1) % frameList.length]}
        {frameList[(frame + 0) % frameList.length]}
      </Text>
    </Box>
  );
};
