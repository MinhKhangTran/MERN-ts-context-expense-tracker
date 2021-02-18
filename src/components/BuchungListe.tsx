import * as React from "react";
import { IBuchung } from "../context/AppContext";
import Moment from "react-moment";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Heading,
  Flex,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useBuchungContext } from "../context/AppContext";
import axios from "axios";

// const dummyData: IBuchung[] = [
//   {
//     _id: "602d02016b1d5f06231a880d",
//     titel: "miete",
//     betrag: 500,
//     createdAt: "2021-02-17T11:46:09.738Z"
//   },
//   {
//     _id: "602d02256b1d5f06231a880e",
//     titel: "miete2",
//     betrag: 500,
//     createdAt: "2021-02-17T11:46:45.493Z"
//   },
//   {
//     _id: "602d02f16b1d5f06231a880f",
//     titel: "Müllabfuhr",
//     betrag: 50,
//     createdAt: "2021-02-17T11:50:09.540Z"
//   }
// ];

const BuchungListe = () => {
  const { dispatch, state, deleteBuchung, setCurrent } = useBuchungContext();
  const { loading, error, buchungen } = state;

  if (loading) {
    return (
      <Box w={{ base: "90%", md: "65%" }} mx="auto" mt={8}>
        <Spinner size="xl" color="purple.400" />
      </Box>
    );
  }

  if (buchungen?.length === 0) {
    return (
      <Box mt={8}>
        <Text>Sorry, du hast keine Daten</Text>
      </Box>
    );
  }
  return (
    <Box mt={8}>
      <Table
        colorScheme="purple"
        variant="striped"
        w={{ base: "90%", md: "65%" }}
        mx="auto"
      >
        <Thead>
          <Tr>
            <Th>Titel</Th>
            <Th>Betrag</Th>
            <Th>Datum</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {buchungen?.map((buchung) => {
            return (
              <Tr key={buchung._id}>
                <Td>{buchung.titel}</Td>
                <Td>{buchung.betrag}</Td>
                <Td>
                  <Moment to={buchung.createdAt} />
                </Td>
                <Td>
                  <IconButton
                    variant="unstyled"
                    color="red.500"
                    aria-label="delete Icon"
                    icon={<FaTrashAlt />}
                    onClick={() => {
                      deleteBuchung(buchung._id);
                    }}
                  />
                  <IconButton
                    variant="unstyled"
                    color="green.500"
                    aria-label="delete Icon"
                    icon={<FaEdit />}
                    onClick={() => setCurrent(buchung)}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justify="center" mt={8}>
        <Heading color="purple.800">
          Summe:{" "}
          {buchungen?.reduce((total: number, cur: IBuchung) => {
            return (total += cur.betrag);
          }, 0)}{" "}
          €
        </Heading>
      </Flex>
    </Box>
  );
};
export default BuchungListe;
