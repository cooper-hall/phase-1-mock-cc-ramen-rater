console.log ("beepbeepboop")

const ramenMenu = document.getElementById("ramen-menu");

const ramenName = document.getElementById("ramen-name");
const ramenRestaurant = document.getElementById("ramen-restaurant");
const ramenImage = document.getElementById("ramen-image");
const commentDisplay = document.getElementById("comment-display");
const ratingDisplay = document.getElementById("rating-display");
const newRamen = document.getElementById("new-ramen");
const updateRamen = document.getElementById("edit-ramen");
const editRating = document.getElementById("edit-rating");
const editComment = document.getElementById("edit-comment");
let ramenId = 1;

newRamen.addEventListener("submit", async (e) => {
  e.preventDefault();
  let img = document.createElement("img");
  img.src = newRamen.image.value;
  const formData = {
    name: newRamen.name.value,
    restaurant: newRamen.restaurant.value,
    image: newRamen.image.value,
    rating: newRamen.rating.value,
    comment: newRamen.comment.value,
  };
  let req = await fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  ramenMenu.append(img);
});

const request = async () => {
  let req = await fetch("http://localhost:3000/ramens");
  let res = await req.json();
  res.forEach((ramen) => {
    let img = document.createElement("img");
    img.src = ramen.image;
    ramenMenu.append(img);
    img.addEventListener("click", () => {
      ramenId = ramen.id;
      console.log(ramenId);
      ramenName.innerText = ramen.name;
      ramenRestaurant.innerText = ramen.restaurant;
      ramenImage.src = ramen.image;
      commentDisplay.innerText = ramen.comment;
      ratingDisplay.innerText = ramen.rating;
    });
  });
};

updateRamen.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData2 = {
    rating: editRating.value,
    comment: editComment.value,
  };

  let req = await fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData2),
  });
});

request();