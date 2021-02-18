import * as React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Button
} from "@chakra-ui/react";
import { IBuchung, useBuchungContext } from "../context/AppContext";
import axios from "axios";
import { API_ENDPOINT } from "../context/AppContext";
import { IEingabe } from "../context/AppContext";

axios.defaults.headers.post["Content-Type"] = "application/json";

const BuchungForm = () => {
  const {
    getBuchungen,
    addBuchung,
    updateBuchung,
    state,
    clearCurrent
  } = useBuchungContext();
  const [formData, setFormData] = React.useState<IBuchung>({
    titel: "",
    betrag: 0
  });

  // Bei Update lieber mit einem Modal oder extra page mit router zb arbeiten, da sonst probleme mit formik, ansonsten custom form machen
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: formData,
    validationSchema: Yup.object({
      titel: Yup.string().required("Bitte geben Sie einen Titel an"),
      betrag: Yup.number().required("Bitte geben Sie einen Betrag an")
    }),
    onSubmit: (daten: IEingabe, { resetForm }: FormikHelpers) => {
      if (state.current === null) {
        addBuchung(daten);
        getBuchungen();
        resetForm({
          daten: {
            titel: "",
            betrag: ""
          }
        });
      } else {
        updateBuchung({
          _id: state.current._id,
          titel: daten.titel,
          betrag: daten.betrag,
          createdAt: state.current.createdAt
        });

        clearCurrent();
        resetForm({});
      }
    }
  });

  React.useEffect(() => {
    setFormData({
      titel: state.current?.titel!,
      betrag: state.current?.betrag!
    });
  }, [state.current, state]);
  return (
    <Box w={{ base: "100%", md: "65%" }} mx="auto" mt={8}>
      <form onSubmit={formik.handleSubmit}>
        {/* Titel */}
        <FormControl
          isInvalid={!!formik.errors.titel && formik.touched.titel}
          id="titel"
          colorScheme="purple"
        >
          <FormLabel color="purple.500" fontSize="2xl">
            Titel
          </FormLabel>
          <Input
            variant="flushed"
            type="text"
            placeholder="Titel"
            {...formik.getFieldProps("titel")}
          />
          <FormErrorMessage>{formik.errors.titel}</FormErrorMessage>
        </FormControl>
        {/* Betrag */}
        <FormControl
          isInvalid={!!formik.errors.betrag && formik.touched.betrag}
          id="number"
          mt={4}
        >
          <FormLabel colorScheme="purple" color="purple.500" fontSize="2xl">
            Betrag
          </FormLabel>
          <Input
            variant="flushed"
            type="number"
            placeholder="Betrag"
            {...formik.getFieldProps("betrag")}
          />
          <FormErrorMessage>{formik.errors.betrag}</FormErrorMessage>
        </FormControl>
        <Button type="submit" mt={8} colorScheme="purple">
          {state.current ? "Ändern" : "Hinzufügen"}
        </Button>
      </form>
    </Box>
  );
};
export default BuchungForm;
