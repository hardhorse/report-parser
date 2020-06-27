import XLSX from 'xlsx';

export const downloadXLSX =  (data, title = "Сводка отчетов", prefix = "report") => {
    const date = new Date();
    const filename = `${prefix}_${date.getDay()}-${date.getMonth()}-${date.getFullYear()}__${date.getHours()}-${date.getMinutes()}.xlsx`;
    const ws_name = title;
    const wb = XLSX.utils.book_new(), ws = XLSX.utils.aoa_to_sheet(data.reduce((acc, table) => ([...acc, ...table]), []));

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, filename);
}