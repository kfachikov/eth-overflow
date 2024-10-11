import { IsNumber, IsString, Min } from 'class-validator';
import { IsUnambigousDateString } from './validators/IsUnambigousDateString.validator';
import { IsLargerOrEqual } from './validators/isLargerOrEqual.validator';
import { Filter } from './filter.model';
import { IsOptionalNonNullable } from './validators/isOptionalNotNullable';

/**
 * Query parameters for a date range.
 */
export class DateFromToQueryParamsRequired<T> {
    /**
     * The time from which to get the overview, inclusive.
     */
    @IsUnambigousDateString()
        from: string;

    /**
     * The time to which to get the overview, inclusive.
     */
    @IsUnambigousDateString()
    @IsLargerOrEqual('from')
        to: string;

    /**
     * The filter
     * Default: return everything
     */
    @IsOptionalNonNullable()
        filter?: Filter<T> = {};
}

/**
 * Query parameters for pagination of lists.
 */
export class PageQueryParams<T> {
    /**
     * The offset of the page.
     * Default: 0
     */
    @IsNumber()
    @Min(0)
        offset = 0;

    /**
     * The limit of the page.
     * Default: 0
     */
    @IsNumber()
    @Min(1)
        limit = 25;

    /**
     * The filter
     * Default: return everything
     */
    @IsOptionalNonNullable()
        filter: Filter<T> = {};
}

export class SearchPhraseQueryParams<T> {
    @IsString()
        search = '';

    /**
     * The offset of the page.
     * Default: 0
     */
    @IsNumber()
    @Min(0)
        offset = 0;

    /**
     * The limit of the page.
     * Default: 0
     */
    @IsNumber()
    @Min(1)
        limit = 25;

    /**
     * The filter
     * Default: return everything
     */
    @IsOptionalNonNullable()
        filter: Filter<T> = {};
}

/**
 * Parameters for getting a list of entities.
 * Generic indicating the Prisma include object, specifying what should be included in each entity.
 */
export class FindManyOptions<TInclude, TWhere, TOrderBy> {
    /**
     * The Prisma include object, specifying what should be included in each entity.
     */
    include: TInclude = {} as TInclude;

    /**
     * Filtering options of the entity that will be put in the where clause
     */
    where: TWhere = {} as TWhere;

    /**
     * Sorting options of the entity that will be put in the orderby clause
     */
    orderBy: TOrderBy = {} as TOrderBy;

    /**
     * The skip of the page (optional).
     */
    skip?: number;

    /**
     * The take of the page (optional).
     */
    take?: number;
}

/**
 * Builder for FindManyOptions.
 * Generic indicating the Prisma include object, specifying what should be included in each entity.
 */
export class FindManyOptionsBuilder<TInclude, TWhere, TOrderBy> {
    private queryParams: FindManyOptions<TInclude, TWhere, TOrderBy>;

    constructor() {
        this.queryParams = new FindManyOptions<TInclude, TWhere, TOrderBy>();
    }

    /**
     * Resets the builder to its initial state.
     */
    reset(): this {
        this.queryParams = new FindManyOptions<TInclude, TWhere, TOrderBy>();
        return this;
    }

    /**
     * Sets the include object.
     * @param include the include object
     */
    setInclude(include: TInclude): this {
        this.queryParams.include = include;
        return this;
    }

    /**
     * Sets the skip.
     *
     * @param skip the skip
     */
    setSkip(skip: number): this {
        this.queryParams.skip = skip;
        return this;
    }

    /**
     * Sets the take.
     *
     * @param take the take
     */
    setTake(take: number): this {
        this.queryParams.take = take;
        return this;
    }

    /**
     * Sets the filters of the entity
     *
     * @param where
     */
    setWhere(where: TWhere): this {
        this.queryParams.where = where;
        return this;
    }

    /**
     * Sets the sorting field of the entity
     *
     * @param field
     */
    setOrderBy(orderBy: TOrderBy): this {
        this.queryParams.orderBy = orderBy;
        return this;
    }

    /**
     * Builds the FindManyOptions object.
     * @returns the FindManyOptions object
     */
    build(): FindManyOptions<TInclude, TWhere, TOrderBy> {
        return this.queryParams;
    }
}

export interface IdDto { id: number }

export interface NameDto { name: string }
