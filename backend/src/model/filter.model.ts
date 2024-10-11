type ExtractEnum<T> = T extends string ? (string extends T ? never : T) : never;

export type Filter<T> = {
    [K in keyof T]?: T[K] extends number ? IntFilter
        : T[K] extends boolean ? BoolFilter
            : T[K] extends Date ? DateFilter
                : T[K] extends string ? (ExtractEnum<T[K]> extends never ? StringFilter : EnumFilter<ExtractEnum<T[K]>>)
                    : T[K] extends (infer Something)[] ? ArrayFilter<Something>
                        : never;
} & {
    AND?: Filter<T>[]
    OR?: Filter<T>[]
};

export interface BoolFilter {
    equals?: boolean
}

export interface IntFilter {
    equals?: number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    in?: number[]
}

export interface StringFilter {
    in?: string[]
}

export interface DateFilter {
    equals?: Date
    lt?: Date
    lte?: Date
    gt?: Date
    gte?: Date
}

export interface ArrayFilter<T> {
    some?: Filter<T>
    none?: Filter<T>
    every?: Filter<T>
}

export interface EnumFilter<T> {
    in?: T[]
}
