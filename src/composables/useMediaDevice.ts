// 画面共有を実装するロジック
// http://dotnsf.blog.jp/archives/1077258778.html

const useMediaDevice = () => {
  const cn = {video: true}; // constraints

  const getDisplayMedia = async (): Promise<MediaStream> => {
    try {
      const {mediaDevices} = navigator;
      const stream:MediaStream = await mediaDevices.getDisplayMedia(cn);
      console.log(stream);
      return stream;
    } catch (e) {
      console.error('Error: ' + e);
      return new MediaStream();
    }
  };

  return {
    getDisplayMedia,
  };
};

export default useMediaDevice;
