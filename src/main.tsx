import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Index.routes";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <RouterProvider router={Routes} />
  </ChakraProvider>
);
