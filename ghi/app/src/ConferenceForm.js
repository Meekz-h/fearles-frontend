import React, {useState, useEffect} from 'react';
function ConferenceForm() {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState("");
    const [starts, setStarts] = useState("");
    const [ends, setEnds] = useState("");
    const [description, setDescription] = useState("");
    const [maxPresentations, setMaxPresentation] = useState("");
    const [maxAttendees, setMaxAttendees] = useState("");
    const [location, setLocation] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleStartsChange = (e) => {
        setStarts(e.target.value);
    }
    const handleEndsChange = (e) => {
        setEnds(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleMaxPresentationsChange = (e) => {
        setMaxPresentation(e.target.value);
    }
    const handleAttendeesChange = (e) => {
        setMaxAttendees(e.target.value);
    }
    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {};
        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;

        const conferenceUrl = "http://localhost:8000/api/conferences/"
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference)
            setName("");
            setDescription("");
            setStarts("");
            setEnds("");
            setMaxAttendees("");
            setMaxPresentation("");
            setLocation("");
        }

    }
    const fetchData = async () => {
        const url = "http://localhost:8000/api/locations/";
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations)
            }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (<>        <div className="row">
    <div className="offset-3 col-6">
      <div className="shadow p-4 mt-4">
        <h1>Create a new conference</h1>
        <form id="create-conference-form" onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              placeholder="Name"
              required
              type="text"
              id="name"
              className="form-control"
                            name="name"
                            onChange={handleNameChange}
                            value={name}
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder="Starts"
              required
              type="date"
              id="starts"
              className="form-control"
                            name="starts"
                            onChange={handleStartsChange}
                            value={starts}
            />
            <label htmlFor="starts">Starts</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder="Ends"
              required
              type="date"
              id="ends"
              className="form-control"
                            name="ends"
                            onChange={handleEndsChange}
                            value={ends}
            />
            <label htmlFor="ends">Ends</label>
          </div>
          <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea placeholder="Description" className="form-control" id="description" name="description" rows="3" required onChange={handleDescriptionChange} value={description}></textarea>

          </div>
          <div className="form-floating mb-3">
              <input
              required
              className="form-control"
              placeholder="Maximum presentations"
              type="number"
              name="max_presentations"
                            id="max_presentations"
                            onChange={handleMaxPresentationsChange}
                            value={maxPresentations}
              />
              <label htmlFor="max_presentations">Maximum presentations</label>
          </div>
          <div className="form-floating mb-3">
              <input
                placeholder="Maximum attendees"
                required
                type="number"
                id="max_attendees"
                className="form-control"
                            name="max_attendees"
                            onChange={handleAttendeesChange}
                            value={maxAttendees}
              />
              <label htmlFor="max_attendees">Maximum attendees</label>
            </div>
          <div className="mb-3">
          <select required id="location" className="form-select" name="location" onChange={handleLocationChange} value={location}>
                            <option value="">Choose a location</option>
                            {locations.map(location => {
                                return (<option key={location.id} value={location.id}>
                                    {location.name}
                                  </option>);
                            })}
          </select>
          </div>
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  </div>
</>);
}
export default ConferenceForm;
