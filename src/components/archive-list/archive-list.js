import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Archive from "../archive/archive";
import { ArchiveInfoDialog } from "../dialogs/archive-info-dialog";
import { getBaseUrl } from "../../storage/requests";
import { getCurrentArchiveId } from "../../app/selectors";
import { updateInfoDialogArchiveId } from "../../app/slice";
import {
  getDisplayMethodForWideArchiveThumbnails,
  getNumArchivePerRow,
} from "../../storage/archives";
import { Loading } from "../loading/loading";
import { ArchiveEditDialog } from "../dialogs/archive-edit-dialog/archive-edit-dialog";

export const ArchiveList = ({
  archives = [],
  display,
  sliceToRender = [0, null],
  isSearch = false,
  archivesLoading = false,
  loadingLabel = "",
  header = null,
  footer = null,
}) => {
  const dispatch = useDispatch();
  const currentArchiveId = useSelector(getCurrentArchiveId);
  const [archiveInfoModalState, updateArchiveInfoModalState] = useState({
    open: false,
    arcId: "",
  });
  const [archiveEditModalState, updateArchiveEditModalState] = useState({
    open: false,
    arcId: "",
  });
  const secondSliceValue = sliceToRender[1] ?? archives.length;
  const baseUrl = getBaseUrl();
  const columns = getNumArchivePerRow();
  const wideThumbnailDisplayMethod = getDisplayMethodForWideArchiveThumbnails();
  const onInfoClick = useCallback((arcId) => {
    dispatch(updateInfoDialogArchiveId(arcId));
    updateArchiveInfoModalState({ open: true, arcId });
  }, []);
  const onEditClick = useCallback((arcId) => {
    updateArchiveEditModalState({ open: true, arcId });
  }, []);

  return (
    <div
      className="full-height"
      style={{
        display,
        overflowY: "scroll",
      }}
    >
      <div style={{ padding: "2rem 1rem 75svh 1rem" }}>
        {header}
        <Grid
          container
          columns={columns}
          spacing={2}
          sx={{
            marginTop: 0,
          }}
        >
          <div id="archives-top" />
          <Loading loading={archivesLoading} label={loadingLabel}>
            {archives
              .slice(sliceToRender[0], secondSliceValue)
              .map((archive, idx) => {
                const { arcid, title, tags } = archive;
                return (
                  <Archive
                    key={`${title}-${arcid}`}
                    index={idx}
                    id={arcid}
                    tags={tags}
                    title={title}
                    isSearch={isSearch}
                    onInfoClick={onInfoClick}
                    onEditClick={onEditClick}
                    baseUrl={baseUrl}
                    currentArchiveId={currentArchiveId}
                    wideImageDisplayMethod={wideThumbnailDisplayMethod}
                  />
                );
              })}
          </Loading>
        </Grid>
        {footer}
      </div>
      <ArchiveInfoDialog
        onClose={() =>
          updateArchiveInfoModalState({ ...archiveInfoModalState, open: false })
        }
        open={archiveInfoModalState.open}
        arcId={archiveInfoModalState.arcId}
      />
      <ArchiveEditDialog
        arcId={archiveEditModalState.arcId}
        onCloseProp={() =>
          updateArchiveEditModalState({ ...archiveEditModalState, open: false })
        }
        open={archiveEditModalState.open}
      />
    </div>
  );
};
