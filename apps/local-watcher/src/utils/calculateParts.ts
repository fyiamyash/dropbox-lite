export function calculateTotalParts(fileSize: number) {
  const fileSizeNumber = Number(fileSize);
  const partSize = calcMinimumPartSize(fileSizeNumber);
  const calcData = {
    parts: Math.ceil(fileSizeNumber / partSize),
    partSize: partSize,
  };
  return calcData;
}

function calcMinimumPartSize(fileSize: number) {
  const minPartSize = 5 * 1024 * 1024;
  const maxFileSiPartSize = 8 * 1024 * 1024;
  const maxParts = 10000;
  if (fileSize / maxFileSiPartSize <= maxParts) {
    return Math.max(Math.ceil(fileSize / maxParts), minPartSize);
  }
  return maxFileSiPartSize;
}
