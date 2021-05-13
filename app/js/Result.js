class Result {
  init() {
    this.dom =  document.getElementById("result");
    this.error =  this.dom.querySelector(".error");
    this.canvas = this.dom.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  render(imageData, upscale) {
    this.canvas.width = imageData.width * upscale;
    this.canvas.height = imageData.height * upscale;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.putImageData(imageData, 0, 0);
    this.ctx.scale(upscale, upscale);
    this.ctx.drawImage(this.canvas, 0, 0);
  }

  setError(error) {
    if (error) {
      this.error.innerHTML = error;
      this.dom.classList.add("error");
    }
    else {
      this.error.innerHTML = "";
      this.dom.classList.remove("error");
    }
  }

  setLoading(loading) {
    if (loading)
      this.dom.classList.add("loading");
    else
      this.dom.classList.remove("loading");
  }
}

export default new Result();
