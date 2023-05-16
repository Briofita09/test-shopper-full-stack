import csvParser from "csv-parser";

export async function readCsv(file: any) {
  try {
    const csvRows: any = [];
    await new Promise((resolve, reject) => {
      const stream = csvParser()
        .on("data", (data: any) => csvRows.push(data))
        .on("error", (error: any) => reject(error))
        .on("end", () => resolve(csvRows));
      stream.write(file);
      stream.end();
    });
    return csvRows;
  } catch (err) {
    console.log(err);
  }
}
