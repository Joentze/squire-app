export interface ExcelSupabaseWrite {
  itemId: string;
  description: string;
  metadata: object;
}

export const formatExcelToPost = (
  rows: any[],
  idLabel: string,
  descLabels: string[]
): ExcelSupabaseWrite[] => {
  let supabaseWriteExcelFormat: ExcelSupabaseWrite[] = [];
  for (let row of rows) {
    let currRow: ExcelSupabaseWrite = {
      itemId: idLabel,
      description: "",
      metadata: row,
    };
    let currDescription = "";
    for (let label of descLabels) {
      if (Object.keys(row).includes(label)) {
        currDescription = currDescription.concat(` ${row[label] as string}`);
      }
    }
    currRow["description"] = currDescription;
    currRow["itemId"] = row[idLabel];
    supabaseWriteExcelFormat.push(currRow);
  }
  return supabaseWriteExcelFormat as ExcelSupabaseWrite[];
};
