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
        {t("reaching")}
      </Typography>
      <Typography color="primary.contrastText" padding={3} marginTop={2}>
        {t("theCouncil")}{" "}
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
        {t("useCO2")}
      </Typography>
    </Box>
  );
};
