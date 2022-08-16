import { useEffect } from "react";
import useTimeout from "./useTimeout";

export interface Args {
  callback: any;
  delay: number;
  dependencies: any;
}

export default function useDebounce(args: Args): void {
  const { reset, clear } = useTimeout(args.callback, args.delay);
  useEffect(reset, [...args.dependencies, reset]);
  useEffect(clear, []);
}
