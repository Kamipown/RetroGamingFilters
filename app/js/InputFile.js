import Input from "./Input";

const getColors = (file) => {
  const img = new Image;

  img.addEventListener("load", () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let imageData = ctx.getImageData(0, 0, img.width, img.height);
    let str = "";
    for (let i = 0; i < imageData.data.length; i += 4)
      str += `[${imageData.data[i]}, ${imageData.data[i + 1]}, ${imageData.data[i + 2]}, 255],\n`
    console.log(str);
  });
  img.src = URL.createObjectURL(file);
};

class InputFile extends Input {
  init(value) {
    super.init("inputFile");
    this.dom.input = this.dom.root.querySelector("input");
    this.dom.input.addEventListener("change", () => {
      const file = this.dom.input.files[0];
      if (file) {
        this.setDomValue(file.name);
        const img = new Image;

        img.addEventListener("load", () => {
          this.setValue(img);
          this.setDomLegend(`${img.width}x${img.height} px`);
          this.onChangeCallback();
        });
        img.src = URL.createObjectURL(file);
      }
    });
  }
}

export default new InputFile();
