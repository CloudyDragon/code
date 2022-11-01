type AAA = {
  aa: string;
  Bb: Array<'aaa_bbb' | 'ccc_ddd_eee'>;
  cc_Dd: {
    eee_fff_ggg: string;
  };
  ff_ii_jj: string;
}

type BBB = {
  aa: string;
  bb: ("aaaBbb" | "cccDddEee")[];
  ccDd: {
    eeeFffGgg: string;
  };
  ffIiJj: string;
}

type Case<T> = T extends any ? {
  [key in keyof T as Uncapitalize<CamelCase<key & string>>]: 
    T[key] extends Array<infer R> ? (CamelCase<R>)[] : 
      T[key] extends Record<string, string> ?
        Case<T[key]>
        : T[key]
} : never

type CamelCase<K> = K extends `${infer A}_${infer B}` ? 
`${A}${Capitalize<CamelCase<B>>}`: K

type res = Case<AAA>

