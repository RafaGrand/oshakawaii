function isIntersecting({ newEntry, fixedElement }) {

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: [1.0]
  };

  const callback = (entries) => {
    let callTo = document.querySelector(fixedElement)
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callTo.setAttribute('active', 'false')
      } else {
        callTo.setAttribute('active', 'true')
      }
    })
  }

  if (newEntry) {
    const newIntersection = new IntersectionObserver(callback, options);
    newIntersection.observe(newEntry);
  }
}

export const intersectionByContainer = (entry, fixedElement) => {
  const newEntry = document.querySelector(entry);
  return isIntersecting({ newEntry, fixedElement });
}
