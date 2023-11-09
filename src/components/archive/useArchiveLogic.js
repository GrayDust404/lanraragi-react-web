import { useCallback, useEffect, useRef, useState } from "react";
import { useImageSize } from "react-image-size";
import { getTagsObjectFromTagsString, httpOrHttps } from "../../utils";
import { THUMBNAIL_URL } from "../../requests/constants";
import { ARCHIVE_STYLES } from "./constants";
import { getRatingType } from "../../storage/ratings";

export const useArchiveLogic = ({
  id,
  baseUrl,
  wideImageDisplayMethod,
  tags,
  currentArchiveId,
}) => {
  const [showFullTitle, updateShowFullTitle] = useState(false);
  const src = `${httpOrHttps()}${baseUrl}${THUMBNAIL_URL.replace(":id", id)}`;
  const [dimensions, { loading }] = useImageSize(src);
  const width = dimensions?.width ?? 0;
  const height = dimensions?.height ?? 0;
  const wideImage = width > height;
  const diffBetweenMaxHeightAndImageHeight = 300 - height;
  const isDiffBetweenMaxHeightAndImageHeightPositive =
    diffBetweenMaxHeightAndImageHeight > 0;
  const extraMargin = isDiffBetweenMaxHeightAndImageHeightPositive
    ? `${diffBetweenMaxHeightAndImageHeight * 0.5}px`
    : 0;
  const wideImageStyles = {
    ...ARCHIVE_STYLES.imageWide,
    ...(wideImageDisplayMethod && { objectFit: wideImageDisplayMethod }),
    ...(isDiffBetweenMaxHeightAndImageHeightPositive && {
      marginTop: extraMargin,
      marginBottom: extraMargin,
    }),
  };
  const ratingFromTags =
    getTagsObjectFromTagsString(tags ?? "")?.[getRatingType()]?.[0] ?? null;
  const rating =
    typeof ratingFromTags === "string"
      ? Number(ratingFromTags)
      : ratingFromTags;

  const ref = useRef();

  const onTitleClick = useCallback(() => {
    updateShowFullTitle(!showFullTitle);
  }, [showFullTitle]);

  useEffect(() => {
    if (id === currentArchiveId && !loading)
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [id, currentArchiveId, ref, loading]);

  return {
    rating,
    wideImageStyles,
    onTitleClick,
    wideImage,
    loading,
    src,
    height,
    width,
    showFullTitle,
    ref,
  };
};