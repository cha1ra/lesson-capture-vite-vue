// 画面共有を実装するロジック
// http://dotnsf.blog.jp/archives/1077258778.html

const useMediaDevice = () => {
  const mediaStreamConstraints = { video: true }

  const getDisplayMedia = async () => {
    try {
      // @ts-ignore
      const captureStream:Promise<MediaStream> = await navigator.mediaDevices.getDisplayMedia(mediaStreamConstraints)
      return captureStream
    } catch (e) {
      console.error('Error: ' + e)
      return new MediaStream()
    }
  }

  return {
    getDisplayMedia
  }
}

export default useMediaDevice
