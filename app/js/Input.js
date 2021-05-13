class Input {
  init(id) {
    const element = document.getElementById(id);
    this.dom = {
      root: element,
      value: element.querySelector(".value"),
      legend: element.querySelector(".legend")
    };
  }

  getValue() {
    return (this.value);
  }

  setValue(value) {
    this.value = value;
  }

  setDomValue(value) {
    this.dom.value.innerHTML = value;
  }

  setDomLegend(legend) {
    this.dom.legend.innerHTML = legend;
  }

  onChange(callback) {
    this.onChangeCallback = callback;
  }
}

export default Input;
