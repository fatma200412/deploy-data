let tbody = document.querySelector("tbody");
let url = "https://northwind.vercel.app/api/suppliers/";

let postForms = document.querySelector(".postForms");
let company = document.querySelector("#company");
let city = document.querySelector("#city");
let country = document.querySelector("#county");

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    data.forEach((element, i) => {
      // elementleri yaratmaq
      tbody.innerHTML += `
       <tr class="table-active">
          <td>${element.companyName}</td>
          <td>${element.address?.city}</td>
          <td>${element.address?.country}</td>
          <td>  <button name="${i}" class="btn btn-warning infoBtn">Info</button></td>
      <td> <button name="${element.id}" class="btn btn-danger deleteBtn">Delete</button></td>
        </tr>
      `;
      // elementler yarandi

      //elementleri silmek

      let deleteBtns = document.querySelectorAll(".deleteBtn");
      for (let btn of deleteBtns) {
        btn.addEventListener("click", function () {
          // ekrandan silmek
          console.log(this.parentElement.parentElement.remove());
          // api-dan silmek
          fetch(url + this.name, {
            method: "DELETE",
          });
        });
      }
      // elementler silindi

      // info

      let infoBtns = document.querySelectorAll(".infoBtn");
      for (let btn of infoBtns) {
        btn.addEventListener("click", function () {
          //     console.log(btn);
          //     console.log(data[btn.name].companyName);
          Swal.fire({
            title: `${data[btn.name].companyName}`,
            text: `${data[btn.name].address?.city}`,
            footer: `${data[btn.name].address?.phone}`,
          });
        });
      }
    });
  })
  .catch((err) => console.log(err));

// post -gondermek
postForms.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    address: {},
  };
  obj.companyName = company.value;
  obj.address.city = city.value;
  obj.address.county = country.value;

  console.log(obj);

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.id);

      tbody.innerHTML += `
      <tr class="table-active">
          <td>${company.value}</td>
          <td>${city.value}</td>
          <td>${country.value}</td>
          <td>  <button class="btn btn-warning">Info</button></td>
      <td> <button name="${data.id}" class="btn btn-danger deleteBtn">Delete</button></td>
        </tr>
      `;

      //elementleri silmek

      let deleteBtns = document.querySelectorAll(".deleteBtn");
      for (let btn of deleteBtns) {
        btn.addEventListener("click", function () {
          // ekrandan silmek
          console.log(this.parentElement.parentElement.remove());
          // api-dan silmek
          fetch(url + this.name, {
            method: "DELETE",
          });
        });
      }
      // elementler silindi
    });
});

// get by id
// fetch(url + "10")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// put
// let obj = {
//   companyName: "asdfghjk",
// };

// fetch(url + "31", {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(obj),
// });

// patch

// let obj2 = { contactName: "qwertyuiop" };
// fetch(url + "30", {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(obj2),
// });
