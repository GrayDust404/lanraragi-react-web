import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArchivesBySearch } from "../../requests/search";
import {
  getCurrentSearchArchives,
  getSearchFilter,
  getSearchPage,
} from "../../app/selectors";
import { updateSearchArchives } from "../../app/slice";
import { ArchiveList } from "../archive-list/archive-list";

export const Search = ({ display }) => {
  const dispatch = useDispatch();
  const searchArchives = useSelector(getCurrentSearchArchives);
  const searchFilter = useSelector(getSearchFilter);
  const searchPage = useSelector(getSearchPage);
  const sliceToRender = [
    searchPage > 1 ? (searchPage - 1) * 24 : 0,
    24 * searchPage,
  ];

  const callNewArchives = useCallback(async (search) => {
    const arcs = await getArchivesBySearch({
      filter: search,
      sortby: "date_added",
      order: "desc",
      start: -1,
    });
    dispatch(updateSearchArchives(arcs.data));
  }, []);

  useEffect(() => {
    if (searchFilter === "") callNewArchives(searchFilter);
  }, []);

  return (
    <ArchiveList
      display={display}
      archives={searchArchives}
      sliceToRender={sliceToRender}
      isSearch
    />
  );
};

export default Search;
