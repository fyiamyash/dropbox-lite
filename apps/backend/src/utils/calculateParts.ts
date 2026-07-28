export function calculateTotalParts(fileSize: string): number {
  const fileSizeNumber = Number(fileSize);
  const partSize = calcMinimumPartSize(fileSizeNumber);

  console.log(Math.ceil(fileSizeNumber / partSize));
  return Math.ceil(fileSizeNumber / partSize);
}

function calcMinimumPartSize(fileSize: number) {
  console.log("sizeeeeee", fileSize);
  const minPartSize = 5 * 1024 * 1024;
  const maxFileSiPartSize = 8 * 1024 * 1024;
  const maxParts = 10000;
  if (fileSize / maxFileSiPartSize <= maxParts) {
    return Math.max(Math.ceil(fileSize / maxParts), minPartSize);
  }
  return maxFileSiPartSize;
}
