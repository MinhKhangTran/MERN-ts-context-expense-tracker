import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProvider } from "./context/AppContext";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <ChakraProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </ChakraProvider>,
  rootElement
);
