import Definable from "../../classes/Definable";
import MusicTrack from "../../classes/MusicTrack";
import getDefinables from "./getDefinables";

const getMusicTracks = (): Map<string, MusicTrack> => {
  const musicTracks: Map<string, MusicTrack> = new Map;
  getDefinables("MusicTrack").forEach((musicTrack: Definable): void => {
    const slug: string = musicTrack.slug;
    if (musicTrack instanceof MusicTrack) {
      musicTracks.set(slug, musicTrack);
    }
  });
  return musicTracks;
};

export default getMusicTracks;