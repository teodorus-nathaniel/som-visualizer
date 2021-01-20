import getNearestElement from "../utils/getNearestElement";

function update(
  weights: number[][],
  sample: number[],
  bmu: number,
  LR: number,
  radius: number,
  currentIteration: number,
  maxIteration: number
) {
  const leftConstraint = Math.max(0, bmu - radius);
  const rightConstraint = Math.min(bmu + radius, weights.length - 1);
  for (let i = leftConstraint; i <= rightConstraint; i++) {
    const weightToUpdate = weights[i];
    const d = Math.abs(bmu - i);
    const sigma = radius * Math.exp(-currentIteration / maxIteration);
    const NS = Math.exp(-Math.pow(d, 2) / (2 * Math.pow(sigma, 2)));

    for (let j = 0; j < weightToUpdate.length; j++) {
      weights[i][j] += NS * LR * (sample[j] - weights[i][j]);
    }
  }

  return weights;
}

function random() {
  return Math.random() * 15 - 7.5;
}

export default function* trainLinearSOM(
  data: number[][],
  neuronCount: number,
  LR: number,
  epochs: number,
  radius: number
): Generator<{
  weights?: number[][][];
  epoch: number;
  dataIndex?: number[];
  bmu?: number[];
}> {
  const dataCount = data.length;
  const pointCount = data[0].length;

  let weights = Array.from({ length: neuronCount }).map(() =>
    Array.from({ length: pointCount }).map(random)
  );

  yield { weights: [weights], epoch: 0 };

  for (let i = 0; i < epochs; i++) {
    for (let j = 0; j < dataCount; j++) {
      const sample = data[j];
      const bmu = getNearestElement(weights, sample);

      yield { bmu: [0, bmu], dataIndex: [0, j], epoch: i + 1 };

      weights = update(weights, sample, bmu, LR, radius, i + 1, epochs);
      yield { epoch: i + 1, weights: [weights] };
    }

    yield { weights: [weights], epoch: i + 1 };
  }
}
