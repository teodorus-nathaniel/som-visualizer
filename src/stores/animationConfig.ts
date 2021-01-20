import { writable } from "svelte/store";
import { cubicOut } from "svelte/easing";

export const animationConfig = writable({
  duration: 500,
  easing: cubicOut
});
