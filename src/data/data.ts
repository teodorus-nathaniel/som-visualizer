import type { Coord } from "../models/Coord";

export let getNeurons = (): Coord[][] => [
  [
    [5, 5],
    [20, 20]
  ],
  [
    [10, 1],
    [50, 30]
  ],
  [
    [40, 10],
    [80, 40]
  ]
];

const randomPoint = (): Coord => {
  const range = 200;
  const min = -100;

  return [
    Math.floor(Math.random() * range + min),
    Math.floor(Math.random() * range + min)
  ];
};

export let getPoints = (): Coord[] =>
  Array.from({ length: 20 }).map(randomPoint);
