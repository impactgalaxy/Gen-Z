import { Table } from "@chakra-ui/react";
import PropTypes from "prop-types";


export default function BalanceTransection({transection}) {
  return (
    <Table.Root size="sm" maxWidth="500px"  margin="auto" border="1px solid">
          <Table.Header >
            <Table.Row className="*:text-center!">
              <Table.ColumnHeader>Date</Table.ColumnHeader>
              <Table.ColumnHeader>TransId</Table.ColumnHeader>
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {transection?.map((item, ind) => (
              <Table.Row key={ind+"a" } overflow="auto" className="*:text-center!">
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>{item._id}</Table.Cell>
                <Table.Cell>{item.balance}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
  )
}
BalanceTransection.propTypes = {
    transection: PropTypes.array
}