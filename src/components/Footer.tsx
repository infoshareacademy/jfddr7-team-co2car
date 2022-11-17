import { FC } from "react";
import { Container, Typography, Link, Box, Stack, Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Styles";

export const Footer: FC = () => {
  return (
    <footer>
      <Box
        bgcolor="primary.main"
        color="white"
        display="flex"
        gap="50px"
        margin="0 auto"
        justifyContent="space-between"
        alignItems="center"
        minHeight="1em"
        paddingLeft="2em"
        paddingRight="2em"
      >
        <Stack>
          <Typography fontSize={10}>&copy;&nbsp;2022</Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          flexWrap="wrap"
          justifyContent="center"
        >
          <Typography fontSize={10} textAlign="center">
            <Link
              href="https://github.com/g-uberman"
              target="blank"
              color="inherit"
              marginLeft={1}
              underline="hover"
            >
              Grzegorz Uberman
            </Link>
          </Typography>

          <Typography fontSize={10} textAlign="center">
            <Link
              href="https://github.com/tom-stenka"
              target="blank"
              color="inherit"
              marginLeft={1}
              underline="hover"
            >
              Tomasz Stenka
            </Link>
          </Typography>

          <Typography fontSize={10} textAlign="center">
            <Link
              href="https://github.com/monika-hilbrycht"
              target="blank"
              color="inherit"
              marginLeft={1}
              underline="hover"
            >
              Monika Hilbrycht
            </Link>
          </Typography>

          <Typography fontSize={10} textAlign="center">
            <Link
              href="https://github.com/dordawi"
              target="blank"
              color="inherit"
              marginLeft={1}
              underline="hover"
            >
              Dorota Dawidowicz
            </Link>
          </Typography>
        </Stack>
      </Box>
    </footer>
  );
};
