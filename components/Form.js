import React from 'react';
import SbEditable from 'storyblok-react'
import { Flex, Box, Text, Input, Button, Heading, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core"
export default class Form extends React.Component {
    constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
      this.state = {
        status: "",
        blok:props.blok
      };
    }
    isRequiredValid(value, name, isRequired) {
      let error;
      if (isRequired && !value) {
        error = `${name} is required`;
      }
      return error || true;
    }
    render() {
      const { status, blok } = this.state;
      return (
        <SbEditable content={blok}>
          <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
              <Box textAlign="center">
                <Heading>{blok.title}</Heading>
              </Box>
              <Box my={4} textAlign="left">
                <form
                    onSubmit={this.submitForm}
                    action={blok.handler}
                    method="POST"
                >
                  {blok.fields.map((field, index) =>
                    <FormControl key={index} mt={6}>
                      <FormLabel>{field.name}</FormLabel>
                      <Input type={field.type} name={field.name} placeholder={field.placeholder}/>
                    </FormControl>                      
                  )}
                    {status === "SUCCESS" ? <Text>{blok.successMessage}</Text> : <Button type="submit" mt={4}>{blok.primaryAction}</Button>}
                    {status === "ERROR" && <Text>{blok.errorMessage}</Text>}
                </form>
              </Box>
            </Box>
          </Flex>
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