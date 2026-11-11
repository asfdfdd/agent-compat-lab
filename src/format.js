function widths(rows) {
  return rows[0].map((_, index) => Math.max(...rows.map((row) => String(row[index]).length)));
}

export function table(headers, body) {
  const rows = [headers, ...body].map((row) => row.map((cell) => String(cell)));
  const sizes = widths(rows);
  return rows
    .map((row, rowIndex) => {
      const line = row.map((cell, index) => cell.padEnd(sizes[index])).join("  ");
      if (rowIndex === 0) {
        return `${line}\n${sizes.map((size) => "-".repeat(size)).join("  ")}`;
      }
      return line;
    })
    .join("\n");
}
