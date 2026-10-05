import { Card, CardContent, Typography } from "@mui/material";

interface NoResultMessageProps {
  msg: string;
}

export const NoResultMessage = ({ msg }: NoResultMessageProps) => {
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
