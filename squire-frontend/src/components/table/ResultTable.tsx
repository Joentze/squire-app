import { Table } from "@mantine/core";

interface IResultTable {
  selectedLabels: string[];
  values: object[];
}

const ResultTable: React.FC<IResultTable> = ({ selectedLabels, values }) => {
  return (
    <>
      <Table withBorder striped>
        <thead>
          <tr>
            {Object.keys(values[0])
              .sort()
              .map((item) => {
                return <th>{item}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {values.map((row, idx) => {
            return (
              <tr>
                {Object.keys(row)
                  .sort()
                  .map((item) => {
                    return (
                      <td
                        className={
                          selectedLabels.includes(item) ? "bg-pink-100" : ""
                        }
                      >
                        {(values as any)[idx][item]}
                      </td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default ResultTable;
