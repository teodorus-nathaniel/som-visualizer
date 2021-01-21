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
  const size = Math.floor(Math.sqrt(weights.length));
  const currentPosition = [Math.floor(bmu / size), bmu % size];
  const leftConstraintRow = Math.max(0, currentPosition[0] - radius);
  const rightConstraintRow = Math.min(
    currentPosition[0] + radius,
    weights.length / size - 1
  );

  const leftConstraintCol = Math.max(0, currentPosition[1] - radius);
  const rightConstraintCol = Math.min(
    currentPosition[1] + radius,
    weights.length / size - 1
  );

  function updateData(position: number[]) {
    const i = position[0] * size + position[1];
    const weightToUpdate = weights[i];

    const d =
      Math.abs(position[0] - currentPosition[0]) +
      Math.abs(position[1] - currentPosition[1]);
    const sigma = radius * Math.exp(-currentIteration / maxIteration);
    const NS = Math.exp(-Math.pow(d, 2) / (2 * Math.pow(sigma, 2)));
    console.log({ sigma, NS });

    for (let j = 0; j < weightToUpdate.length; j++) {
      weights[i][j] += NS * LR * (sample[j] - weights[i][j]);
    }
  }

  for (let i = leftConstraintRow; i <= rightConstraintRow; i++) {
    const now = [i, currentPosition[1]];
    updateData(now);
  }
  for (let i = leftConstraintCol; i <= rightConstraintCol; i++) {
    const now = [currentPosition[0], i];
    updateData(now);
  }

  return weights;
}

function random() {
  return Math.random() * 15 - 7.5;
}

function generate2dWeights(weights: number[][]): number[][][] {
  let size = Math.floor(Math.sqrt(weights.length));
  let data: number[][][] = [];
  for (let i = 0; i < size; i++) {
    let row: number[][] = [];
    for (let j = 0; j < size; j++) {
      row.push(weights[i * size + j]);
    }
    data.push(row);
  }
  return data;
}

export function getPositionFromIndex(index: number, max: number) {
  const size = Math.floor(Math.sqrt(max));
  return [Math.floor(index / size), index % size];
}

export default function* train2dSOM(
  data: number[][],
  neuronCount: number,
  LR: number,
  epochs: number,
  radius: number
): Generator<{
  weights?: number[][][];
  epoch: number;
  dataIndex?: number;
  bmu?: number[];
}> {
  const dataCount = data.length;
  const pointCount = data[0].length;

  let weights = Array.from({ length: neuronCount }).map(() =>
    Array.from({ length: pointCount }).map(random)
  );

  yield { weights: generate2dWeights(weights), epoch: 0 };

  for (let i = 0; i < epochs; i++) {
    for (let j = 0; j < dataCount; j++) {
      const sample = data[j];
      const bmu = getNearestElement(weights, sample);

      yield {
        bmu: getPositionFromIndex(bmu, weights.length),
        dataIndex: j,
        epoch: i + 1
      };

      weights = update(weights, sample, bmu, LR, radius, i + 1, epochs);
      yield { epoch: i + 1, weights: generate2dWeights(weights) };
    }

    console.log({ i });
    yield { weights: generate2dWeights(weights), epoch: i + 1 };
  }
}
