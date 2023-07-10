import * as XLSX from "xlsx";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { checkFile } from "../../fileHandler/fileHandler";
// import { writeAllChunks } from "../../buildHandler/buildHandler";
// import {
//   ExcelSupabaseWrite,
//   formatExcelToPost,
// } from "../../buildHandler/excelHandler";

interface IExcelFileDrop {
  setRows: Dispatch<SetStateAction<object[]>>;
}

const ExcelFileDrop: React.FC<IExcelFileDrop> = ({ setRows }) => {
  const onFileDrop = async (e: any) => {
    const [file] = e.target.files;

    const reader = new FileReader();
    checkFile(file);
    reader.onload = async (evt: any) => {
      // console.log(evt);
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      let rows: unknown[] = [];
      for (let wsname of wb.SheetNames) {
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        rows = rows.concat(data);
        // console.log(data);
        // const newChunks = formatExcelToPost(data, ["Name", "Type"]);
        // writeAllChunks(chunks, "test_pid", "test_bid");
      }
      setRows(rows as object[]);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <input
      type="file"
      onInput={onFileDrop}
      className="bg-gray-100 rounded-lg border font-mono p-1 w-full"
    />
  );
};
export default ExcelFileDrop;
