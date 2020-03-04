const getters = {
  songList:state => state.audio.songList,
  musicIndex:state => state.audio.index,
  musicPaused:state => state.audio.paused,
}
export default getters