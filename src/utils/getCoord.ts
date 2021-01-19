export default function getCoord(pos: number, scale: number, isX?: boolean) {
  return (isX ? 1 : -1) * pos * scale;
}
