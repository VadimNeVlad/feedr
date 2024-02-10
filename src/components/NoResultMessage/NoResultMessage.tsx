import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { NoResultMessageProps } from "../../utils/types/props";

export const NoResultMessage: React.FC<NoResultMessageProps> = ({ msg }) => {
  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        mt: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight={700}>
          {msg}
        </Typography>
      </CardContent>
    </Card>
  );
};
