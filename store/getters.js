const getters = {
  songList:state => state.audio.songList,
  musicIndex:state => state.audio.index,
  musicPaused:state => state.audio.paused,
  audio:state => state.audio.audio,
  musicID:state => state.audio.musicID,
  lrclist:state => state.audio.lrclist,
  comments:state => state.audio.comments,
  lrcTime:state => state.audio.lrcTime,
}
export default getters