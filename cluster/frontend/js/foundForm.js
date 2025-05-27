document.getElementById("foundForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const res = await fetch("http://localhost:5000/api/found", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        description: document.getElementById("model").value,
        location: document.getElementById("location").value,
        dateFound: document.getElementById("dateFound").value
      })
    });
  
    const data = await res.json();
  
    if (res.ok) {
      M.toast({ html: "Item reported!", classes: "green rounded" });
      document.getElementById("foundForm").reset();
    } else {
      M.toast({ html: data.error || "Error reporting", classes: "red rounded" });
    }
  });
  