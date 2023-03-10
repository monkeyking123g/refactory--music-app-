import { Typography, Box } from "@mui/material";

interface header {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: header) => {
  return (
    <Box mb={"5px"}>
      <Typography variant="h2" fontWeight="bold" ml="10px">
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};

export default Header;
