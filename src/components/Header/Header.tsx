import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { useGetCurrentUserQuery } from "../../features/users/usersApi";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { SearchInput } from "../SearchInput/SearchInput";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { HeaderAuthBtns } from "./HeaderAuthBtns/HeaderAuthBtns";

export const Header = () => {
  const sessionUser = useSelector((state: RootState) => state.auth.user);
  const { currentData: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !sessionUser,
  });
  // The stored session renders immediately; the fresh profile replaces it once loaded.
  const user = sessionUser && (currentUser ?? sessionUser);

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        bgcolor: "background.paper",
        boxShadow: 1,
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "15px",
          minHeight: "56px",
          maxWidth: "1900px",
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <MobileMenu />
          <Typography variant="h5">
            <Link to="/">
              FeeD<Box component="span" sx={{ color: "primary.main" }}>R</Box>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <SearchInput placeholder="Search..." />
          </Box>
        </Box>

        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              to="/add-article"
              variant="outlined"
              sx={{ display: { xs: "none", md: "block" }, mr: 2 }}
            >
              Create Article
            </Button>
            <UserDropdown user={user} />
          </Box>
        ) : (
          <HeaderAuthBtns />
        )}
      </Box>
    </Box>
  );
};
