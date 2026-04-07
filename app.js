function showLost() {
  let output = "<h2>Lost Items</h2>";

  db.collection("lost").get().then(snapshot => {
    snapshot.forEach(doc => {
      let i = doc.data();
      output += `
        <div style="background:white;padding:10px;margin:10px;border-radius:5px;">
          <b>${i.name}</b><br>
          📍 ${i.location}<br>
          📞 ${i.phone}<br>
          ✉️ ${i.email}
        </div>
      `;
    });

    document.getElementById("items").innerHTML = output;
  });
}

function showFound() {
  let output = "<h2>Found Items</h2>";

  db.collection("found").get().then(snapshot => {
    snapshot.forEach(doc => {
      let i = doc.data();
      output += `
        <div style="background:white;padding:10px;margin:10px;border-radius:5px;">
          <b>${i.name}</b><br>
          📍 ${i.location}<br>
          📞 ${i.phone}<br>
          ✉️ ${i.email}
        </div>
      `;
    });

    document.getElementById("items").innerHTML = output;
  });
}

function searchItems() {
  const query = document.getElementById("search").value.toLowerCase();
  let output = "<h2>Search Results</h2>";

  db.collection("lost").get().then(snapshot => {
    snapshot.forEach(doc => {
      let i = doc.data();
      if (i.name.toLowerCase().includes(query)) {
        output += `
          <div style="background:white;padding:10px;margin:10px;border-radius:5px;">
            <b>${i.name}</b><br>
            📍 ${i.location} (Lost)
          </div>
        `;
      }
    });

    db.collection("found").get().then(snapshot2 => {
      snapshot2.forEach(doc => {
        let i = doc.data();
        if (i.name.toLowerCase().includes(query)) {
          output += `
            <div style="background:white;padding:10px;margin:10px;border-radius:5px;">
              <b>${i.name}</b><br>
              📍 ${i.location} (Found)
            </div>
          `;
        }
      });

      document.getElementById("items").innerHTML = output;
    });
  });
}
