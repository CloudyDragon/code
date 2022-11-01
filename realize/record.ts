type MyRecord<T extends string | number | symbol, U> = { [key in T]: U }
