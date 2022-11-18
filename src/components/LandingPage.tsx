import {
  Box,
  TextField,
  Typography,
  Button,
  Link as MUILink,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      flexGrow={1}
      maxWidth={600}
      padding={5}
      paddingTop={0}
      paddingBottom={0}
      marginTop={0}
      marginBottom={0}
    >
      <Typography
        color="primary.contrastText"
        variant="h4"
        padding={3}
        marginTop={4}
      >
        Reaching 100% CO₂ emission reduction target for both new cars and vans
        by 2035 is possible.
      </Typography>
      <Typography color="primary.contrastText" padding={3} marginTop={2}>
        The Council and the European Parliament reached a provisional agreement
        on stricter CO₂ emission performance standards for new cars and vans.
        Pending a formal adoption, the co-legislators agreed to a 55% CO₂
        emission reduction target for new cars and 50% for new vans by 2030
        compared to 2021 levels and to a 100% CO₂ emission reduction target for
        both new cars and vans by 2035.{" "}
        <MUILink
          href="https://www.consilium.europa.eu/en/infographics/fit-for-55-emissions-cars-and-vans/"
          target="blank"
          color="inherit"
        >
          {t("learnMore")}
        </MUILink>
      </Typography>
      <Typography
        color="primary.contrastText"
        variant="h5"
        padding={3}
        marginTop={2}
        marginBottom={7}
      >
        Use CO₂CAR to check the emission levels for your current or next car!
      </Typography>
    </Box>
  );
};
