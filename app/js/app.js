import InputFile from "./InputFile";
import InputFilter from "./InputFilter";
import InputPixelate from "./InputPixelate";
import InputUpscale from "./InputUpscale";

import Result from "./Result";

import filters from "./filters";

const update = () => {
  Result.setLoading(true);
  const image = InputFile.getValue();
  const filter = filters[InputFilter.getValue()];
  const pixelate = InputPixelate.getValue();
  const upscale = InputUpscale.getValue();

  const width = parseInt(image.width / pixelate) || 1;
  const height = parseInt(image.height / pixelate) || 1;

  InputPixelate.setDomLegend(`${width}x${height} px`);
  InputUpscale.setDomLegend(`${width * upscale}x${height * upscale} px`);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const resultData = ctx.createImageData(width, height);

  const worker = new Worker("filter.worker.js");
  worker.onmessage = (e) => {
    Result.setLoading(false);
    Result.render(e.data, upscale);
  };
  worker.postMessage([filter, imageData, resultData]);
};

window.addEventListener("load", () => {
  Result.init();

  InputFile.init(null);
  InputFilter.init("gameboy");
  InputPixelate.init(8, 1, 16);
  InputUpscale.init(4, 1, 16);

  if (window.Worker) {
    InputFile.onChange(update);
    InputFilter.onChange(() => {if (InputFile.getValue()) update();});
    InputPixelate.onChange(() => {if (InputFile.getValue()) update();});
    InputUpscale.onChange(() => {if (InputFile.getValue()) update();});
  }
  else
    Result.setError("Your browser does not support Web Workers.");
});
