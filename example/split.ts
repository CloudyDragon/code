type MySplit<T extends string, R = null> = T extends ""
  ? R
  : T extends `${infer A}${infer B}`
    ? MySplit<B, A | R>
    : R

type R = MySplit<"我在这里">