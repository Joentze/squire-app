import * as XLSX from "xlsx";

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
        console.log(data);
      }
    };
    reader.readAsBinaryString(file);
  };

  return <input type="file" onInput={onFileDrop} />;
};
export default ExcelFileDrop;
