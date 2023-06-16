import * as XLSX from "xlsx";
import { formatExcelToPost } from "../../buildHandler/excelHandler";

const ExcelFileDrop = () => {
  const onFileDrop = (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      for (let wsname of wb.SheetNames) {
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        // console.log(data);
        console.log(formatExcelToPost(data, ["Name", "Type"]));
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
