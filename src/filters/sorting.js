export const filterSort = () => {
  const sortId = document.getElementById("sorting-soru");
  sortId.addEventListener("change", function (e) {
    e.preventDefault();
    location.href = "?sort_by=" + e.target.value;
  })
}