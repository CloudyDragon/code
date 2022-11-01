function twoSum(a: number[], t: number) {
  if (a.length === 0) return
  let map = new Map()
  for (let i = 0; i < a.length; i++) {
    if (map.get(a[i])) {
      console.log(`x: ${map.get(a[i])}  y: ${a[i]}`)
      return
    } else {
      map.set(t - a[i], a[i])
    }
  }
}

twoSum([1, 2, 3, 4], 6)
twoSum([1, 2, 3, 4], 61)

function twoSum2(a: number[], t: number, set: Set<number>): boolean {
  if (a.length === 0) return false;
  let delta = t - a[0]
  return set.has(delta) || twoSum2(a.slice(1), t, new Set([...set, a[0]]))
}

type ToTuple<T, U extends number[] = []> = U['length'] extends T ? U : ToTuple<T, [...U, 0]>

type Add<M extends number, N extends number> = [...ToTuple<M>, ...ToTuple<N>]['length']
type Sub<M extends number, N extends number> = ToTuple<M> extends [...ToTuple<N>, ...infer A] ? A['length'] : -1


type Tail<T> = T extends [any, ...infer R] ? R : []
type TwoSum<T extends number[], U extends number, R = any> = T['length'] extends 0
  ? false
  : Sub<U, T[0]> extends R
    ? true
    : TwoSum<Tail<T>, U, R | T[0]>

  

type R23 = TwoSum<[1, 2, 3, 4], 6>

type R24 = Sub<1000, 999> // 10
type R25 = Sub<5, 2> // 3
type R26 = R23 extends true ? 'yes' : 'noe'
type S = [0, 0, 0] extends [0, ...infer A] ? A : -1