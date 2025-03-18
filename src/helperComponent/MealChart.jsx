import { Box, Table } from "@chakra-ui/react"
import PropTypes, { object } from "prop-types";

const MealChart = ({meals, mealCount}) => {
  return (
    <Box>
      <Table.Root size="sm" maxWidth="500px"  margin="auto" border="1px solid">
      <Table.Header >
        <Table.Row className="*:text-center!">
          <Table.ColumnHeader>Date</Table.ColumnHeader>
          <Table.ColumnHeader>Morning ({mealCount.morning})</Table.ColumnHeader>
          <Table.ColumnHeader>Noon ({mealCount.noon})</Table.ColumnHeader>
          <Table.ColumnHeader>Night ({mealCount.night})</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {meals?.map((item, ind) => (
          <Table.Row key={ind+"a" } overflow="auto" className="*:text-center!">
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
  meals: PropTypes.array,
  mealCount: object
}
