import { ApiError } from "@/helpers";
import { Cloudinary } from "@cloudinary/url-gen";

import axios from "axios";

export const uploadOnCloudinary = async (image: File): Promise<string> => {
  new Cloudinary({
    cloud: {
      cloudName: "dhnvpzxt6",
      apiKey: "361221822466173",
      apiSecret: "lJQeWaa5ReqnV6XpcwTpynOcMuQ",
    },
  });
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "xmatoImage");
  data.append("cloud_name", "dhnvpzxt6");
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dhnvpzxt6/upload",
      data
    );
    const resData = await response.data;
    return resData.url;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error?.status as number, error?.message);
    }
    throw new ApiError(500);
  }
};
