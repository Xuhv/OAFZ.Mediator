import { createRequestEmitter, createNotificationEmitter } from '@oafz/mediator';
import { useEffect, useRef } from 'react';
import { useMatches, useSearchParams } from 'react-router-dom';
import { isEqual } from 'lodash-es';

export type QueryState = Record<string, string | string[]>;

export const queryChangedNotifier = createNotificationEmitter<QueryState>({ name: 'queryChanged' });

export const changeQueryRequester = createRequestEmitter<
  {
    query: QueryState;
    /**
     * @default "replace"
     */
    mode?: 'replace' | 'merge';
    /**
     * emit query object even if there is no change
     */
    force?: boolean;
    /**
     * in case of concurrent modification, it is necessary to check the current state is expected.
     */
    concurrencyCheck?: Partial<QueryState>;
  },
  void
>({ name: 'changeQuery' });

export function searchToObject(search: URLSearchParams) {
  const query: QueryState = {};
  search.forEach((value, key) => {
    if (!query[key]) query[key] = value;
    else {
      const v = query[key];
      if (Array.isArray(v)) v.push(value);
      else query[key] = [v, value];
    }
  });
  return query;
}

export function objectToSearch(query: QueryState, ignoreEmpty = true) {
  const search = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (ignoreEmpty && value === '') return;
    if (Array.isArray(value)) value.forEach(v => search.append(key, v));
    else search.append(key, value);
  });
  return search;
}

/**
 * emit query object when search params or matched route change. it depends on lodash-es' isEqual
 * @returns
 */
export function SearchParamsPlugin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef<QueryState>(searchToObject(searchParams));
  const matchedRoute = useMatches().at(-1);

  useEffect(() => {
    const query = searchToObject(searchParams);

    Promise.resolve().then(() => {
      queryChangedNotifier.send(query);
    });

    return changeQueryRequester.receive(async ({ payload: { query, force, mode, concurrencyCheck } }) => {
      let finalQuery: QueryState = {};
      if (mode === 'merge') finalQuery = { ...searchToObject(searchParams), ...query };
      else finalQuery = query;

      if (
        concurrencyCheck &&
        Object.entries(concurrencyCheck).some(
          ([key, value]) => !isEqual(searchRef.current[key], value) && searchRef.current[key] !== undefined
        )
      )
        return;

      if (!isEqual(finalQuery, searchRef.current) || force) {
        searchRef.current = finalQuery;
        setSearchParams(objectToSearch(finalQuery));
      }
    });
  }, [searchParams, setSearchParams, searchRef, matchedRoute]);

  return null;
}
