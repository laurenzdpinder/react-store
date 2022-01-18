const getHdImage = (thumbnail) => {
  const urlPieceA = thumbnail.split('_')[1];
  const urlPieceB = thumbnail.split('_')[2].split('I')[0];
  return `https://http2.mlstatic.com/D_NQ_NP_${urlPieceA}_${urlPieceB}O.webp`;
};

export default getHdImage;
