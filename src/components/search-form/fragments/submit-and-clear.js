import { Button, Grid } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSearchCategory,
  updateSearchPage,
  updateSearchArchives,
  updateSearchFilter,
  updateLoading,
} from "../../../app/slice";
import {
  getCategories,
  getSearchFilter,
  getSearchSort,
  getSearchSortDirection,
} from "../../../app/selectors";
import { getArchivesBySearch } from "../../../requests/search";

export const SubmitAndClear = ({
  selectedCategoryId,
  onClose = () => null,
  setSelectedCategoryId,
}) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const searchFilter = useSelector(getSearchFilter);
  const searchSort = useSelector(getSearchSort);
  const searchSortDirection = useSelector(getSearchSortDirection);

  const callNewArchives = useCallback(
    async ({ filter, category, sortby, order }) => {
      dispatch(updateLoading({ search: true }));
      const arcs = await getArchivesBySearch({
        filter,
        sortby,
        order,
        start: -1,
        ...(category && { category }),
      });
      dispatch(updateSearchArchives(arcs.data));
      dispatch(updateLoading({ search: false }));
    },
    []
  );
  const onSubmit = useCallback(() => {
    dispatch(updateSearchPage(1));
    dispatch(
      updateSearchCategory(
        categories.find(({ id }) => id === selectedCategoryId) ?? {}
      )
    );
    callNewArchives({
      filter: searchFilter,
      category: selectedCategoryId,
      sortby: searchSort,
      order: searchSortDirection,
    });
    onClose();
  }, [
    searchFilter,
    selectedCategoryId,
    onClose,
    categories,
    searchSort,
    searchSortDirection,
  ]);
  const onClear = () => {
    dispatch(updateSearchPage(1));
    dispatch(updateSearchCategory({}));
    dispatch(updateSearchFilter(""));
    setSelectedCategoryId("");
    callNewArchives({
      filter: "",
      category: "",
      sortby: searchSort,
      order: searchSortDirection,
    });
    onClose();
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6} sm={6}>
        <Button fullWidth onClick={onSubmit}>
          Apply Filter
        </Button>
      </Grid>
      <Grid justifyContent="center" item xs={6} sm={6}>
        <Button fullWidth onClick={onClear}>
          Clear Filter
        </Button>
      </Grid>
    </Grid>
  );
};
