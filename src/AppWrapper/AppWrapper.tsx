import { Box } from "@mui/material";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100dvh", // תופס את כל הגובה כולל mobile safe areas
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eaf0f8",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 430,
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: { xs: "0px", sm: "20px" },
          boxShadow: { sm: "0 4px 20px rgba(0,0,0,0.1)" },
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
