// this funtions button the +/- quantity
export function addPlus(add) {
  let quantity = document.querySelectorAll(add);
  quantity.forEach(element => {
    var spinner = element,
        input = spinner.children[0],
        btnUp = spinner.children[1].children[1],
        btnDown = spinner.children[1].children[0],
        min = input.getAttribute("min"),
        max = input.getAttribute("max");

    btnUp.addEventListener("click", function() {
      var oldValue = parseFloat(input.value);
      
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      input.value = newVal;
      input.dispatchEvent(new Event("change"));
    });

    btnDown.addEventListener("click", function() {
      var oldValue = parseFloat(input.value);
      
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      input.value = newVal;
      input.dispatchEvent(new Event("change"));
    });
  })
}