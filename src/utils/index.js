import { soundDatas } from "../assets/data";

const tempData = ["rain", "wind", "forest", "boost"];

export const getDataFromUrlParams = (urlParams) => {
  const temp = [];

  for (let i = 0; i < tempData?.length; i++) {
    let obj = {
      ...soundDatas[i],
      volume: urlParams.get(tempData[i]) || 0,
    };
    temp.push(obj);
  }

  return temp;
};

export const createPresetUrl = (soundsData) => {
  let temp = "";

  for (let i = 0; i < soundsData?.length; i++) {
    if (parseFloat(soundsData[i].volume) > 0) {
      temp += tempData[i] + "=" + soundsData[i].volume + "&";
    }
  }

  return temp;
};

export const checkValidQueryParams = (urlParams) => {
  if (
    urlParams.includes("rain") ||
    urlParams.includes("forest") ||
    urlParams.includes("wind") ||
    urlParams.includes("boost")
  ) {
    return true;
  } else {
    return false;
  }
};
