function showLost() {
  let output = "<h2>Lost Items</h2>";

  db.collection("lost").get().then(snapshot => {

    snapshot.forEach(doc => {
      let i = doc.data();
      let color = "#ff6b6b";
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

    if(snapshot.empty){
  output += "<p>No items found 😔</p>";
}

    snapshot.forEach(doc => {
      let i = doc.data();
      let color = "#51cf66";
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
  const query = document.getElementById("search").value.trim().toLowerCase();

  let output = "<h2>Search Results</h2>";
  let found = false;

  db.collection("lost").get().then(snapshot => {

    snapshot.forEach(doc => {
      let i = doc.data();

      if(i.name && i.name.toLowerCase().includes(query)) {
        found = true;

        output += `
          <div class="card">
            <b>${i.name}</b><br>
            📍 ${i.location} (Lost)
          </div>
        `;
      }
    });

    db.collection("found").get().then(snapshot2 => {

      snapshot2.forEach(doc => {
        let i = doc.data();

        if(i.name && i.name.toLowerCase().includes(query)) {
          found = true;

          output += `
            <div class="card">
              <b>${i.name}</b><br>
              📍 ${i.location} (Found)
            </div>
          `;
        }
      });

      if(!found){
        output += "<p>No items found 😔</p>";
      }

      document.getElementById("items").innerHTML = output;
    });

  });
}
