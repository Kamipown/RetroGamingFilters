import Input from "./Input";

import filters from "./filters";

class InputFilter extends Input {
  init(value) {
    super.init("inputFilter");
    this.dom.options = this.dom.root.querySelector(".options");
    this.setValue(value);

    document.addEventListener("click", (event) => {
      let target = event.target;
      do {
        if (target == this.dom.root) {
          this.dom.root.classList.toggle("active");
          return ;
        }
        target = target.parentNode;
      } while (target);
      this.dom.root.classList.remove("active");
    });

    for (let key in filters) {
      let option = document.createElement("div");
      let p = document.createElement("p");
      let span = document.createElement("span");

      let filter = filters[key];
      
      p.innerHTML = filter.name;

      option.appendChild(p);
      option.appendChild(span);

      option.addEventListener("click", () => {
        if (key !== this.getValue()) {
          this.setValue(key);
          this.setDomValue(filter.name);
          this.setDomLegend(`${filter.colors.length} colors`);
          this.onChangeCallback();
        }
      });

      this.dom.options.appendChild(option);
    }
  }
}

export default new InputFilter();
