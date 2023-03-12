module.exports = class Label_in_input {
  onFocusFunc = (el) => {
    let label = el.closest(".input-wrap").querySelector("label");

    return label.classList.add("focus-label");
  };

  onBlurFunc = (el) => {
    let label = el.closest(".input-wrap").querySelector("label");

    return (
      el.value.trim().length === 0 && label.classList.remove("focus-label")
    );
  };
};

