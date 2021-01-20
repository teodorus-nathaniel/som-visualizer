import type { Coord } from "../models/Coord";

export let getNeurons = (): Coord[][] => [
  [
    {
      x: 5,
      y: 5
    },
    {
      x: 20,
      y: 20
    }
  ],
  [
    {
      x: 10,
      y: 1
    },
    {
      x: 50,
      y: 30
    }
  ],
  [
    {
      x: 40,
      y: 10
    },
    {
      x: 80,
      y: 40
    }
  ]
];

const randomPoint = (): Coord => {
  const range = 200;
  const min = -100;

  return {
    x: Math.floor(Math.random() * range + min),
    y: Math.floor(Math.random() * range + min)
  };
};

export let getPoints = (): Coord[] =>
  Array.from({ length: 50 }).map(randomPoint);
