import Input from "./Input";

class InputUpscale extends Input {
  init(value, min, max) {
    super.init("inputUpscale");
    this.dom.decrement = this.dom.root.querySelector(".decrement");
    this.dom.increment = this.dom.root.querySelector(".increment");
    this.setValue(value);

    this.dom.decrement.addEventListener("click", () => {
      if (this.value > min) {
        let newValue = this.value - 1;
        this.setValue(newValue);
        this.setDomValue(newValue);
        this.onChangeCallback();
      }
    });

    this.dom.increment.addEventListener("click", () => {
      if (this.value < max) {
        let newValue = this.value + 1;
        this.setValue(newValue);
        this.setDomValue(newValue);
        this.onChangeCallback();
      }
    });
  }
}

export default new InputUpscale();
