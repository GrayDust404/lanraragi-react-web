import React, { useCallback } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { THUMBNAIL_URL } from "../../requests/constants";
import {
  updateCurrentArchiveId,
  updatePages,
  updateSectionVisibility,
} from "../../app/slice";
import { getSectionVisibilityObjectWithAllFalse } from "../../app/selectors";

const styles = {
  paper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#363940",
  },
  image: { height: 300, width: "100%" },
  typography: {
    textTransform: "none",
    fontWeight: "bold",
    wordWrap: "break-word",
  },
};

export const Archive = ({
  id,
  title,
  index,
  onInfoClick,
  baseUrl,
  currentArchiveId,
}) => {
  const dispatch = useDispatch();
  const allSectionsFalse = useSelector(getSectionVisibilityObjectWithAllFalse);
  const src = `http://${baseUrl}${THUMBNAIL_URL.replace(":id", id)}`;
  const onPress = useCallback(() => {
    if (currentArchiveId !== id) dispatch(updatePages([]));
    dispatch(updateSectionVisibility({ ...allSectionsFalse, images: true }));
    dispatch(updateCurrentArchiveId(id));
  }, [id]);

  return (
    <Paper id={`archive_${id}`} style={styles.paper}>
      <div>
        <div>
          <img
            id={`archive-img-${index}`}
            alt={`thumbnail for ${title}`}
            style={styles.image}
            src={src}
            placeholder={`Loading thumbnail for ${title}`}
          />
        </div>
      </div>
      <div style={{ padding: "8px" }}>
        <Typography id={`archive-text-${index}`} sx={styles.typography}>
          {title}
        </Typography>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={onPress}
            fullWidth
            sx={{ backgroundColor: "#43464E" }}
          >
            Read
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={onInfoClick}
            fullWidth
            sx={{ backgroundColor: "#43464E" }}
          >
            Info
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Archive;