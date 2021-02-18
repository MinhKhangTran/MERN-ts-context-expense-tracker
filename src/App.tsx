import { Box, Heading } from "@chakra-ui/react";
import BuchungForm from "./components/BuchungForm";
import BuchungListe from "./components/BuchungListe";

export default function App() {
  return (
    <Box mb={8} w="90%" mx="auto">
      <Heading color="purple.500" mt={4}>
        Ausgaben Tracker
      </Heading>
      {/* Form */}
      <BuchungForm />
      {/* Liste */}
      <BuchungListe />
    </Box>
  );
}
