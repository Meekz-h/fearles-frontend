import React, { useState, useEffect } from "react";

function PresentationForm() {

    const [conferences, setConferences] = useState([])
    const [formData, setFormData] = useState({
        presenter_name: "",
        company_name: "",
        presenter_email: "",
        title: "",
        synopsis: "",
        conference:"",
    })

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const presentationUrl = `http://localhost:8000/api/conferences/${formData.conference}/presentations/`
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setFormData({
                presenter_name: "",
                company_name: "",
                presenter_email: "",
                title: "",
                synopsis: "",
                conference:"",
            })
        }
    }
  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        setConferences(data.conferences)
    }
    };
    useEffect(() => {
        fetchData();
    });

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new presentation</h1>
              <form id="create-presentation-form" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                                      placeholder="Presenter Name"
                                      required
                                      type="text"
                                      id="presenter_name"
                                      className="form-control"
                                      name="presenter_name"
                                      onChange={handleFormChange}
                                      value={formData.presenter_name}
                  />
                  <label htmlFor="presenter_name">Presenter Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    placeholder="presenter_email"
                    required
                    type="email"
                    id="presenter_email"
                    className="form-control"
                                      name="presenter_email"
                                      onChange={handleFormChange}
                                      value={formData.presenter_email}
                  />
                  <label htmlFor="presenter_email">Presenter Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    placeholder="Company Name"
                    required
                    type="text"
                    id="company_name"
                    className="form-control"
                                      name="company_name"
                                      onChange={handleFormChange}
                                      value={formData.company_name}
                  />
                  <label htmlFor="company_name">Company Name</label>
                </div>
                <div className="form-floating mb-3">
                                  <input placeholder="Title" required type="text" name="title" id="title" className="form-control" onChange={handleFormChange} value={formData.title} />
                <label htmlFor="title">Title</label>
              </div>
                <div className="mb-3">
                  <label htmlFor="synopsis">Synopsis</label>
                  <textarea
                    placeholder="Synopsis"
                    className="form-control"
                    id="synopsis"
                    name="synopsis"
                    rows="3"
                                      required
                                      onChange={handleFormChange}
                                      value={formData.synopsis}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <select
                    required
                    id="conference"
                    className="form-select"
                                      name="conference"
                                      onChange={handleFormChange}
                                      value={formData.conference}
                  >
                    <option value="">Choose a conference</option>
                                      {conferences.map(conference => {
                                          return (
                                            <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                          </option>
                        )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PresentationForm;
