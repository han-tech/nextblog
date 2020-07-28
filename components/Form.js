import React from 'react';
import SbEditable from 'storyblok-react'

export default class Form extends React.Component {
    constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
      this.state = {
        status: "",
        blok:props.blok
      };
    }
  
    render() {
      const { status, blok } = this.state;
      return (
        <SbEditable content={blok}>
            <form
                onSubmit={this.submitForm}
                action={blok.handler}
                method="POST"
            >
                <div className="util__flex-col">
                    {blok.fields.map((field) =>
                        <div>
                            <label>{field.name}:</label>
                            <input type={field.type} name={field.name} />
                        </div>
                    )}
                </div>
                {status === "SUCCESS" ? <p>{blok.successMessage}</p> : <button>Submit</button>}
                {status === "ERROR" && <p>{blok.errorMessage}</p>}
            </form>
        </SbEditable>
      );
    }
  
    submitForm(ev) {
      ev.preventDefault();
      const form = ev.target;
      const data = new FormData(form);
      const xhr = new XMLHttpRequest();
      xhr.open(form.method, form.action);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
          form.reset();
          this.setState({ status: "SUCCESS" });
        } else {
          this.setState({ status: "ERROR" });
        }
      };
      xhr.send(data);
    }
  }