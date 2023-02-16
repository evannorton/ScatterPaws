import ImageSource from "../../classes/ImageSource";
import getDefinable from "./getDefinable";

const getImageSource = (slug: string): ImageSource => getDefinable({
  className: "ImageSource",
  slug
}) as ImageSource;

export default getImageSource;