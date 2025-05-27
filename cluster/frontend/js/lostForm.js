document.getElementById("lostForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in.");
    return;
  }

  const res = await fetch("http://localhost:5000/api/lost", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`  //  Include this!
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      description: document.getElementById("model").value,
      color: document.getElementById("color").value,
      locationLost: document.getElementById("locationLost").value
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Lost item reported!");
  } else {
    alert("Error: " + (data.error || "Something went wrong"));
  }
});
