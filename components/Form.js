import React from 'react';
import SbEditable from 'storyblok-react'
import { Flex, Box, Text, Input, Button } from "@chakra-ui/core"
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
                <Flex>
                    {blok.fields.map((field, index) =>
                        <Box key={index}>
                            <Text>{field.name}:</Text>
                            <Input type={field.type} name={field.name} />
                        </Box>
                    )}
                </Flex>
                {status === "SUCCESS" ? <Text>{blok.successMessage}</Text> : <Button>Submit</Button>}
                {status === "ERROR" && <Text>{blok.errorMessage}</Text>}
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