import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import { writeAllChunks } from "../../buildHandler/buildHandler";
import {
  ExcelSupabaseWrite,
  formatExcelToPost,
} from "../../buildHandler/excelHandler";
import { write } from "fs";

const ExcelFileDrop = () => {
  const [chunks, setChunks] = useState<ExcelSupabaseWrite[]>([]);
  const onFileDrop = async (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = async (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      for (let wsname of wb.SheetNames) {
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        // console.log(data);
        const chunks = formatExcelToPost(data, ["Name", "Type"]);
        writeAllChunks(chunks, "test_pid", "test_bid");
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <input
      type="file"
      onInput={onFileDrop}
      className="bg-gray-100 rounded-lg border border-2 p-1"
    />
  );
};
export default ExcelFileDrop;
