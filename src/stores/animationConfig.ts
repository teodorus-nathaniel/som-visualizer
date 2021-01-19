import { writable } from "svelte/store";
import { cubicOut } from "svelte/easing";

export const animationConfig = writable({
  duration: 5000,
  easing: cubicOut
});
