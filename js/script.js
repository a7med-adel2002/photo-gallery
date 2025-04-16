const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const searchIcon = document.querySelector(".search-icon");
const lightBox = document.querySelector(".lightbox");
const closeBtn = lightBox.querySelector(".fa-xmark");
const downloadImgBtn = lightBox.querySelector(".fa-download");
const zoomBtn = lightBox.querySelector(".fa-magnifying-glass-plus");
const copyLinkBtn = lightBox.querySelector(".fa-link");
const twitterBtn = lightBox.querySelector(".fa-x-twitter");
const nextBtn = lightBox.querySelector(".next-btn");
const prevBtn = lightBox.querySelector(".prev-btn");

const perPage = 15;
let currentPage = 1;
let searchTerm = null;
let allImages = [];
let currentImageIndex = null;
let zoomedImageElement = null;
let customCategoryBtn = null; // ✅ Track the custom category button

const spinner = document.createElement("div");
spinner.className = "spinner";
spinner.innerHTML = `<div class="loader"></div>`;
imagesWrapper.parentElement.appendChild(spinner);

const noResults = document.createElement("p");
noResults.className = "no-results";
noResults.textContent = "No images found.";
imagesWrapper.parentElement.appendChild(noResults);
noResults.style.display = "none";

const downLoadImg = (imgURL) => {
  fetch(imgURL)
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Failed to download image"));
};

const showLightbox = (name, img, index) => {
  const imgEl = lightBox.querySelector("img");
  const highResImg = new Image();
  highResImg.src = img;
  highResImg.onload = () => {
    imgEl.src = img;
    imgEl.classList.remove("zoomed");
    lightBox.querySelector("span").textContent = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightBox.classList.add("show");
    document.body.style.overflow = "hidden";
    currentImageIndex = index;
    imgEl.focus();
  };
};

const hideLightbox = () => {
  lightBox.classList.remove("show");
  document.body.style.overflow = "auto";
};

const generateHTML = (images) => {
  let startIndex = allImages.length;
  allImages.push(...images);

  if (images.length === 0 && allImages.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }

  imagesWrapper.innerHTML += images
    .map(
      (img, idx) =>
        `<li class="card" tabindex="0" onclick="showLightbox('${
          img.photographer
        }', '${img.src.large2x}', ${startIndex + idx})" aria-label="Image by ${
          img.photographer
        }">
          <img src="${img.src.large2x}" alt="Image by ${img.photographer}" />
          <div class="details">
            <div class="photographer">
              <i class="fa-solid fa-camera"></i>
              <span>${img.photographer}</span>
            </div>
            <button onclick="downLoadImg('${
              img.src.large2x
            }');event.stopPropagation();" aria-label="Download Image">
              <i class="fa-solid fa-download"></i>
            </button>
          </div>
        </li>`
    )
    .join("");
};

const getImages = (apiURL) => {
  loadMoreBtn.innerHTML = "Loading...";
  loadMoreBtn.classList.add("disabled");
  spinner.style.display = "block";
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
      loadMoreBtn.innerHTML = "Load More";
      loadMoreBtn.classList.remove("disabled");
    })
    .catch(() => alert("Failed to load images!"))
    .finally(() => {
      spinner.style.display = "none";
    });
};

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `http://localhost:3000/api/images?page=${currentPage}&per_page=${perPage}`;
  if (searchTerm) {
    apiURL += `&query=${encodeURIComponent(searchTerm)}`;
  }
  getImages(apiURL);
};

const addSearchToCategories = (term) => {
  const categoriesContainer = document.querySelector(".category-filters");

  // Remove previous custom button if exists
  if (customCategoryBtn) {
    customCategoryBtn.remove();
    customCategoryBtn = null;
  }

  // Create new button
  const btn = document.createElement("button");
  btn.textContent = term;
  btn.dataset.category = term;
  btn.classList.add("active");
  categoriesContainer
    .querySelectorAll("button")
    .forEach((b) => b.classList.remove("active"));
  categoriesContainer.appendChild(btn);

  // Store reference to it
  customCategoryBtn = btn;

  // Re-attach the click behavior
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".category-filters button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    searchTerm = btn.dataset.category || null;
    currentPage = 1;
    allImages = [];
    imagesWrapper.innerHTML = "";

    const apiURL =
      `http://localhost:3000/api/images?page=${currentPage}&per_page=${perPage}` +
      (searchTerm ? `&query=${encodeURIComponent(searchTerm)}` : "");

    getImages(apiURL);
  });
};

const performSearch = () => {
  const query = searchInput.value.trim();
  if (query === "") return;

  currentPage = 1;
  searchTerm = query;
  imagesWrapper.innerHTML = "";
  allImages = [];

  getImages(
    `http://localhost:3000/api/images?page=${currentPage}&per_page=${perPage}&query=${encodeURIComponent(
      searchTerm
    )}`
  );

  addSearchToCategories(query); // ✅ Add to categories
};

const loadSearchImages = (e) => {
  if (e.key === "Enter") {
    performSearch();
  } else if (e.target.value === "") {
    searchTerm = null;
  }
};

searchIcon.addEventListener("click", performSearch);
loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);
closeBtn.addEventListener("click", hideLightbox);

lightBox.addEventListener("click", (e) => {
  const img = lightBox.querySelector("img");
  if (e.target === lightBox) {
    if (img.classList.contains("zoomed")) {
      img.classList.remove("zoomed");
      document.body.style.cursor = "default";
      zoomedImageElement = null;
    } else {
      hideLightbox();
    }
  }
});

downloadImgBtn.addEventListener("click", (e) =>
  downLoadImg(e.target.dataset.img)
);

zoomBtn.addEventListener("click", () => {
  const img = lightBox.querySelector("img");
  if (!img.classList.contains("zoomed")) {
    img.classList.add("zoomed");
    zoomedImageElement = img;
    document.body.style.cursor = "zoom-out";
    zoomedImageElement.addEventListener("click", handleZoomOutOnce);
  }
});

function handleZoomOutOnce() {
  if (zoomedImageElement) {
    zoomedImageElement.classList.remove("zoomed");
    zoomedImageElement.removeEventListener("click", handleZoomOutOnce);
    zoomedImageElement = null;
    document.body.style.cursor = "default";
  }
}

copyLinkBtn.addEventListener("click", () => {
  const imgURL = downloadImgBtn.dataset.img;
  navigator.clipboard.writeText(imgURL).then(() => alert("Image link copied!"));
});

twitterBtn.addEventListener("click", () => {
  const imgURL = encodeURIComponent(downloadImgBtn.dataset.img);
  const tweetURL = `https://twitter.com/intent/tweet?url=${imgURL}&text=Check%20out%20this%20photo!`;
  window.open(tweetURL, "_blank");
});

document.querySelectorAll(".category-filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".category-filters button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    searchTerm = btn.dataset.category || null;
    currentPage = 1;
    allImages = [];
    imagesWrapper.innerHTML = "";

    const apiURL =
      `http://localhost:3000/api/images?page=${currentPage}&per_page=${perPage}` +
      (searchTerm ? `&query=${encodeURIComponent(searchTerm)}` : "");

    getImages(apiURL);
  });
});

const navigateLightbox = (direction) => {
  if (currentImageIndex === null) return;

  const newIndex =
    direction === "next"
      ? (currentImageIndex + 1) % allImages.length
      : (currentImageIndex - 1 + allImages.length) % allImages.length;

  const img = allImages[newIndex];
  showLightbox(img.photographer, img.src.large2x, newIndex);
};

nextBtn.addEventListener("click", () => navigateLightbox("next"));
prevBtn.addEventListener("click", () => navigateLightbox("prev"));

document.addEventListener("keydown", (e) => {
  if (!lightBox.classList.contains("show")) return;

  if (e.key === "Escape") {
    if (zoomedImageElement) {
      handleZoomOutOnce();
    } else {
      hideLightbox();
    }
  } else if (e.key === "ArrowRight") {
    navigateLightbox("next");
  } else if (e.key === "ArrowLeft") {
    navigateLightbox("prev");
  }
});

// Initial fetch
getImages(
  `http://localhost:3000/api/images?page=${currentPage}&per_page=${perPage}`
);
