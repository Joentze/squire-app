// import { FirebaseChunkDoc } from "../types/documentTypes";

export interface ExcelSupabaseWrite {
  document: string;
  metadata: object;
}

export const formatExcelToPost = (
  rows: any[],
  descLabels: string[]
): ExcelSupabaseWrite[] => {
  let supabaseWriteExcelFormat: ExcelSupabaseWrite[] = [];
  for (let row of rows) {
    let currRow: ExcelSupabaseWrite = {
      document: "",
      metadata: row,
    };
    let currDescription = "";
    for (let label of descLabels) {
      if (Object.keys(row).includes(label)) {
        currDescription = currDescription.concat(` ${row[label] as string}`);
      }
    }
    currRow["document"] = currDescription;
    supabaseWriteExcelFormat.push(currRow);
  }
  return supabaseWriteExcelFormat as ExcelSupabaseWrite[];
};

// export const sliceRowsIntoChunks = (): FirebaseChunkDoc[][] => {

// };
