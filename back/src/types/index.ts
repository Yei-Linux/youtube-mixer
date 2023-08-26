export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type RequiredProperty<T> = {
  [P in keyof T]: Required<NonNullable<T[P]>>;
};
export type RequiredNonNullableObject<T extends object> = {
  [P in keyof Required<T>]: NonNullable<T[P]>;
};
