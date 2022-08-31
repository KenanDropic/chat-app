import { useEffect } from "react";
import useTimeout from "./useTimeout";

export interface Args {
  callback: any;
  delay: number;
  dependencies: any;
}

export default function useDebounce(
  callback: any,
  delay: number,
  dependencies: any
): void {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
