import { Button, Divider, MultiSelect, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import { writeAllChunks } from "../../buildHandler/buildHandler";
import {
  ExcelSupabaseWrite,
  formatExcelToPost,
} from "../../buildHandler/excelHandler";
import ExcelFileDrop from "../../components/fileInput/ExcelFileDrop";
import ResultTable from "../../components/table/ResultTable";

interface MantineMultiType {
  label: string;
  value: string;
}

// const toMantineMultiSelectDataFormat = (
//   colKeys: string[]
// ): MantineMultiType[] => {
//   const data: MantineMultiType[] = [];
//   colKeys.forEach((item) => data.push({ value: item, label: item }));
//   return data;
// };

const BuildPage = () => {
  const [rows, setRows] = useState<object[]>([]);
  const [colLabels, setColLabels] = useState<string[]>([""]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const uploadChunk = async () => {
    const newChunks = formatExcelToPost(rows, selectedLabels);
    await writeAllChunks(newChunks, "test_movie_pid", "test_movie_bid");
  };
  useEffect(() => {
    // console.log(rows);
    if (rows.length > 0) {
      const colStrKeys = Object.keys(rows[0]).sort();
      // const colKeys = toMantineMultiSelectDataFormat(colStrKeys);
      // console.log(colKeys);
      setColLabels(colStrKeys);
    }
  }, [rows]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <Text weight={"bolder"} size="lg" color={"pink"}>
          Project Name
        </Text>
        <div className="flex-grow"></div>
        <Button
          onClick={uploadChunk}
          variant={"default"}
          disabled={!(rows.length > 0 && selectedLabels.length > 0)}
        >
          Build Engine 🔨
        </Button>
      </div>
      <Divider />
      <>
        {rows.length === 0 ? (
          <div className="h-full w-full flex flex-col gap-2">
            <ExcelFileDrop setRows={setRows} />
            <div className="bg-gray-100 w-full h-full rounded-md"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <MultiSelect
              onChange={setSelectedLabels}
              limit={5}
              withAsterisk
              className="border-1 border-pink-100"
              searchable
              data={colLabels}
              label="Labels"
              placeholder="Labels"
              size={"md"}
              description="Pick at least one column label to base your recommendations on."
            />
            <Text>Items</Text>
            <ResultTable
              selectedLabels={selectedLabels}
              values={rows.slice(0, 20)}
            />
            <div className="m-auto flex flex-col">
              <p className="m-auto text-gray-400">First 20 rows</p>
              <IoArrowDown className="m-auto text-gray-400" />
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default BuildPage;
