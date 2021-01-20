import getDistance from "./getDistance";

export default function getNearestElement(
  weights: number[][],
  sample: number[]
) {
  let min = {
    value: Infinity,
    index: -1
  };
  for (let j = 0; j < weights.length; j++) {
    let dist = getDistance(weights[j], sample);
    if (dist < min.value) {
      min.index = j;
      min.value = dist;
    }
  }

  return min.index;
}
