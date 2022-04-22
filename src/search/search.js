import { useEffect, useState, useCallback } from "react"
import "./main.css"
import "./styles.css"


const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 1000);
  };
};


function Search() {

  const [location, setLocation] = useState("Manhattan")
  const [term, setTerm] = useState("Food")

  const debouncedyelpcall = useCallback(debounce(() => {
    fetch(`http://localhost:3000/yelp?term=${term}&location=${location}`).then(async r => {
      const body = await r.json()
      console.log(body)
      const stuff = body.businesses.map(b => ({ name: b.name, rating: b.rating }))
      console.log(stuff)
      setBusiness(stuff)
    })

  }), []);

  function renderCalender(restaurantname) {
    var date = prompt("Enter a valid date to go to a trip (in this order:yyyy-mm-dd)");
    var time=prompt("Enter a valid time in this date(in this order(13:00:00)");
    var calendarEl = document.getElementById('calendar');

    var calendar = new window.FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },

        initialDate: new Date(),
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true,
        selectable: true,
        events: [{
            title: restaurantname,
            start: date+"T"+time,

        }, ]
    });
// rendering the calendar after the clicks
    calendar.render();
}

  const [business, setBusiness] = useState([])
  useEffect(() => {
    debouncedyelpcall()
  }, [term, location])



  return <>
    <div id="holdingStuff" class="container-fluid">
      <div class="row">
        <div id="searching" class="col col-3 mx-1">
          <div class="search-wrapper">
            <label for="search"><p >Search Location</p></label>
            <input onInput={(e) => setLocation(e.currentTarget.value)} class="form-control" placeholder="Search Location" type="search" id="search" data-search />
          </div>
          <div class="user-cards" data-user-cards-container></div>
          <template data-user-template>
            <div class="card" onclick="onClick()">
              <div class="header" data-header>
                <div class="body" data-body>
                </div>
              </div>
            </div>
          </template>

          <div class="search-wrapper mt-5">
            <label for="search"><p>Search Restaurant</p></label>
            <input onInput={(e) => setTerm(e.currentTarget.value)} class="form-control" placeholder="Search Restaurant" type="search" id="searchResto" data-search />
          </div>
          <div class="user-cards" data-user-cards-container2></div>
          {business.map(s => (
            <div data-user-template2>
              <div class="card" onClick={() =>renderCalender(s.name)}>
                <div class="header" data-header2>
                  <div class="body" data-body2>
                    {s.name} : {s.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="calen" class="col col-8 mx-5">
          <div id='calendar'></div>
        </div>
      </div>
    </div>

    <div id="postButtonDiv" class="container-fluid">
      <center>
        <button id="myBtn" type="button" data-toggle="modal" class="btn btn-primary mt-2" data-target="#sampleModal">
          Post Your Experience
        </button>
      </center>

      <div class="fade modal" id="sampleModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Make a Post</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
              <div class="form-outline">
                <input class="imgSelect form-control" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                <input placeholder="Caption" type="email" id="cap" class="form-control form-control" />
              </div>
            </div>

            <div class="modal-footer">
              <button id="btnUpload" type="button" class="btn btn-primary" data-dismiss="modal">Upload</button>
              <button id="btnCancel" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div id="bPosts" class="row">

      </div>
    </div>

  </>
}

export default Search