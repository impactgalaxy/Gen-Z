import { Box, Table } from "@chakra-ui/react"
import PropTypes from "prop-types";

const MealChart = ({meals}) => {
  return (
    <Box>
      <Table.Root size="sm" maxWidth="500px"  margin="auto" border="1px solid">
      <Table.Header >
        <Table.Row className="*:text-center!">
          <Table.ColumnHeader>Date</Table.ColumnHeader>
          <Table.ColumnHeader>Morning</Table.ColumnHeader>
          <Table.ColumnHeader>Noon</Table.ColumnHeader>
          <Table.ColumnHeader>Night</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {meals?.map((item) => (
          <Table.Row key={item.morning } overflow="auto" className="*:text-center!">
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>{item.morning ? item?.morning : "0"}</Table.Cell>
            <Table.Cell>{item.noon ? item?.noon: "0"}</Table.Cell>
            <Table.Cell >{item.night ? item?.night: "0"}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </Box>
  )
}

export default MealChart;

MealChart.propTypes = {
  meals: PropTypes.array
}