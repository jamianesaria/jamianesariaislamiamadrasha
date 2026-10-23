import "server-only";
import { stegaClean } from "@sanity/client/stega";
import type { GalleryPhotoItem, GalleryVideoItem } from "@/data/siteData";
import { getGalleryPhotos, getGalleryVideos } from "./queries";
export async function getGalleryRecords() {
  const [photos, videos] = await Promise.all([getGalleryPhotos(), getGalleryVideos()]);
  return {
    photos: photos.map((record): GalleryPhotoItem => ({ ...record, _type: "galleryPhoto", id: record._id, category: stegaClean(record.category || "campus") as GalleryPhotoItem["category"], imageUrl: stegaClean(record.imageUrl || "/drone_poster.jpg"), description: record.caption, date: record.date || "" })),
    videos: videos.map((record): GalleryVideoItem => ({ ...record, _type: "galleryVideo", id: record._id, youtubeId: stegaClean(record.youtubeId || ""), localVideoUrl: record.localVideoUrl ? stegaClean(record.localVideoUrl) : undefined, thumbnail: stegaClean(record.thumbnail || "/drone_poster.jpg"), category: stegaClean(record.category || "madrasa") as GalleryVideoItem["category"], date: record.date || "" })),
  };
}
