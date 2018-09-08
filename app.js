$(document).ready(function() {
  $(".add-text-btn").on("click", function() {

    //store values
    let inputKey = $(".user-input-title").val();
    let inputValue = $(".user-input-body").val();

    //clear values

    $(".user-input-title").val("");
    $(".user-input-body").val("");
    console.log(inputKey, inputValue);

    // alert(inputValue);
    localStorage.setItem(inputKey, inputValue);

    // let localStorageVal = localStorage.getItem("testStorage");
    //insert this value into local storage
    // let itemHtml = `<div class="display-item">${localStorage.getItem("testStorage")}</div>`;
    let itemHtml = '<div class="display-item" data-storage-key="' + inputKey + '">' + inputKey + ' ' + localStorage.getItem(inputKey) + '</div>';

    $(".display").html(itemHtml);
    //https://learn.jquery.com/events/event-delegation/
    $(".display-item").on("click", function (e) {
      console.log("key=> ", e.target.dataset.storageKey); //user-input-title
      localStorage.getItem(e.target.dataset.storageKey);  //user-input-body
      console.log("value=>", e.target.dataset.storageKey);
      //plop the key:value back into the input boxes
        // get the values from the divs?
        // set those values in the form fields
        $(".user-input-title").val(e.target.dataset.storageKey);
        $(".user-input-title").val(localStorage.getItem(e.target.dataset.storageKey));


    });
  });

  

  $(".user-input").on("keyup", function() {

    let inputValue = $(".user-input").val();

    localStorage.setItem("testStorage", inputValue);

    let localStorageVal = localStorage.getItem("testStorage");
    //insert this value into local storage
    $(".display").text(localStorageVal);
  });

  $(".del-text-btn").on("click", function() {

    localStorage.removeItem($('.user-input-title').val());
    alert('item deleted? check the console');
    $(".user-input-title").val("");
    $(".user-input-body").val("");
    $(".display").val("");

  });
  // iterate approach to adding items
  // store data as stringified array of objects
  // store data with individual keys
  // how do we get keys ? Research Object.keys
  // delete an item
});