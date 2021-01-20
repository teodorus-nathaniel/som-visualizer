export default function getDistance(data1: number[], data2: number[]) {
  let distance = 0;
  for (let i = 0; i < data1.length; i++) {
    distance += Math.pow(data1[i] - data2[i], 2);
  }
  return Math.sqrt(distance);
}
