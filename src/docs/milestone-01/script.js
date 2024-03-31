function readMore() {
    const headers = document.querySelectorAll('main > section > h2');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            const paragraph = this.nextElementSibling;
            if (paragraph.style.display === 'none') {
                paragraph.style.display = 'block';
            } else {
                paragraph.style.display = 'none';
            }
        });
    });
}
function imageShowcase() {
    const img_src = [
        "https://www.pngall.com/wp-content/uploads/1/Coat-Free-PNG.png",
        "https://www.pngall.com/wp-content/uploads/1/Coat-Free-PNG.png",
        "https://i.pinimg.com/474x/51/7b/c2/517bc28512e3d3ba53a286487a32a8e4.jpg",
        "https://www.pngall.com/wp-content/uploads/1/Coat-Free-PNG.png",
        "https://i.pinimg.com/474x/51/7b/c2/517bc28512e3d3ba53a286487a32a8e4.jpg",
    ];
    const showcase = document.getElementById('image-showcase');
    const scroll_left = document.getElementById('scroll-left');
    const scroll_right = document.getElementById('scroll-right');
    img_src.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "showcase";
        showcase.appendChild(img);
    });
    let scrollAmount = 0;

    // let totalWidth = (200 + 8 * 2) * 3;
    // showcase.style.width = `${totalWidth}px`;

    function scroll(direction) {
        // const width = showcase.clientWidth;
        // const scroll_width = width / 3;
        const scroll_width = 216*3;
        if (direction === "left") {
            scrollAmount -= scroll_width;
            if (scrollAmount < 0) scrollAmount = 0;
        } else {
            scrollAmount += scroll_width;
            if (scrollAmount > showcase.scrollWidth - showcase.parentNode.offsetWidth) {
                scrollAmount = showcase.scrollWidth - showcase.parentNode.offsetWidth;
            }
        }
        showcase.style.transform = `translateX(-${scrollAmount}px)`;
    }
    scroll_left.addEventListener('click', () => scroll("left"));
    scroll_right.addEventListener('click', () => scroll("right"));
}
document.addEventListener('DOMContentLoaded',readMore);
document.addEventListener('DOMContentLoaded',imageShowcase);