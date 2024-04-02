function readMore() {
  const headers = document.querySelectorAll("main > section > h2");
  headers.forEach((header) => {
    header.addEventListener("click", function () {
      const paragraph = this.nextElementSibling;
      if (paragraph.style.display === "none") {
        paragraph.style.display = "block";
      } else {
        paragraph.style.display = "none";
      }
    });
  });
}
function imageShowcase() {
  const img_src = [
    "/img/burberryhat.webp",
    "/img/lvcoat.png",
    "/img/nikefleece.png",
    "/img/no9tee.png",
    "/img/scarf.png",
  ];

  const showcase = document.getElementById("image-showcase");
  const scroll_left = document.getElementById("scroll-left");
  const scroll_right = document.getElementById("scroll-right");

  for (let i = 0; i < 3; i++) {
    const first_img = img_src[i];
    const last_img = img_src[img_src.length - 1 - i];

    const firstClone = document.createElement("img");
    firstClone.src = first_img;
    firstClone.alt = "showcase";
    firstClone.classList.add("clone");

    const lastClone = document.createElement("img");
    lastClone.src = last_img;
    lastClone.alt = "showcase";
    lastClone.classList.add("clone"); // class for clone elements

    showcase.appendChild(firstClone); // first clones at the end
    showcase.insertBefore(lastClone, showcase.firstChild); // last clone before first child
  }
  img_src.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "showcase";
    showcase.appendChild(img);
  });
  let scrollAmount = 0;

  function scroll(direction) {
    const width = showcase.clientWidth / 3; // width of each image card
    // const width = 216*3;
    if (direction === "left") {
      scrollAmount -= width;
      if (scrollAmount < 0) {
        // loop to end if > start
        scrollAmount = showcase.scrollWidth - showcase.parentNode.offsetWidth;
      }
    } else {
      scrollAmount += width;
      if (
        scrollAmount >=
        showcase.scrollWidth - showcase.parentNode.offsetWidth
      ) {
        // loop to start if > end
        scrollAmount = 0;
      }
    }
    showcase.style.transform = `translateX(-${scrollAmount}px)`;
  }
  scroll_left.addEventListener("click", () => scroll("left"));
  scroll_right.addEventListener("click", () => scroll("right"));
}
document.addEventListener("DOMContentLoaded", readMore);
document.addEventListener("DOMContentLoaded", imageShowcase);
