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
  const [showModal, setShowModal] = useState(false)
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState()

  const debouncedyelpcall = useCallback(debounce(() => {
    fetch(`http://localhost:3000/yelp?term=${term}&location=${location}`).then(async r => {
      const body = await r.json()
      console.log(body)
      const stuff = body.businesses.map(b => ({ name: b.name, rating: b.rating }))
      console.log(stuff)
      setBusiness(stuff)
    })

  }), []);

  useEffect(() => {
    renderCalender()
  }, [])

  const saveEvent = async (restaurant) => {
    var date = prompt("Enter a valid date to go to a trip (in this order:yyyy-mm-dd)");
    var time= prompt("Enter a valid time in this date(in this order(13:00:00)");
    
    const event = {
      title: restaurant,
      start: date+"T"+time,
    }
    
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event)
    })

    console.log(response)

    renderCalender()
  }

  const upload = async () => {
    var form_data = new FormData(); // Creating object of FormData class
    console.log(image)
    form_data.append("file", image) // Appending parameter named file with properties of file_field to form_data
    form_data.append("caption", caption) // Adding extra parameters to form_data
    
    await fetch('http://localhost:3000/blogs', {
      method: 'post',
      body: form_data,
    })
  }

  const renderCalender = async () => {
    var calendarEl = document.getElementById('calendar');
    const eventsResponse = await fetch(`http://localhost:3000/events`)
    const events = await eventsResponse.json()
    console.log(events)
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
      events: events,
    });
    // rendering the calendar after the clicks
    calendar.render();

    return calendar
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
              <div class="card" onClick={() => saveEvent(s.name)}>
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
        <button id="myBtn" type="button" data-toggle="modal" data-target="#sampleModal" class="btn btn-primary mt-2" onClick={() => setShowModal(true)}>
          Post Your Experience
        </button>
      </center>

      <div className={showModal ? "fade modal active" : "fade modal hidden"} id="sampleModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Make a Post</h4>
              <button onClick={() => setShowModal(false)} type="button" class="close" data-dismiss="modal" >&times;</button>
            </div>

            <div class="modal-body">
              <div class="form-outline">
                <input onInput={(e) => setImage(e.target.files[0])} class="imgSelect form-control" type="file" id="avatar" name="file" accept="image/png, image/jpeg" />
                <input onInput={(e) => setCaption(e.currentTarget.value)} placeholder="Caption" type="email" id="cap" class="form-control form-control" />
              </div>
            </div>

            <div class="modal-footer">
              <button id="btnUpload" type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => upload()}>Upload</button>
              <button id="btnCancel" type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setShowModal(false)}>Cancel</button>
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