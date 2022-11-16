import { FC } from "react";
import { Container, Typography, Link, Box, Stack, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";

export const Footer: FC = () => {
  return (
    <footer>
      <Box
        bgcolor="primary.light"
        color="white"
        display="flex"
        gap="50px"
        margin="0 auto"
        justifyContent="space-between"
        alignItems="center"
        height="2em"
        paddingLeft="2em"
        paddingRight="2em"
      >
        <Stack>
          <Typography fontSize={10}>&copy; 2022</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Typography fontSize={10}>
            <Link
              href="https://github.com/g-uberman"
              target="blank"
              color="inherit"
              marginLeft={1}
            >
              Grzegorz Uberman
            </Link>
          </Typography>

          <Typography fontSize={10}>
            <Link
              href="https://github.com/tom-stenka"
              target="blank"
              color="inherit"
              marginLeft={1}
            >
              Tomasz Stenka
            </Link>
          </Typography>

          <Typography fontSize={10}>
            <Link
              href="https://github.com/monika-hilbrycht"
              target="blank"
              color="inherit"
              marginLeft={1}
            >
              Monika Hilbrycht
            </Link>
          </Typography>

          <Typography fontSize={10}>
            <Link
              href="https://github.com/dordawi?tab=repositories"
              target="blank"
              color="inherit"
              marginLeft={1}
            >
              Dorota Dawidowicz
            </Link>
          </Typography>
        </Stack>
      </Box>
    </footer>
  );
};
