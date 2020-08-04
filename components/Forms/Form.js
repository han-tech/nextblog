import Component from '../index';
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Select,
  Checkbox,
  SimpleGrid,
  CheckboxGroup,
  RadioGroup,
  Textarea,
  Heading,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/core";

export default function Form(props) {
  const { handleSubmit, errors, register, formState, reset  } = useForm();
  const {blok} = props;
  const [status, setStatus] = useState("");
  

  function onSubmit(values) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", blok.handler);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        setStatus("SUCCESS");
      } else {
        setStatus("ERROR");
      }
    };
    xhr.send(JSON.stringify(values));
  }
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box w="lg" p={2}>
        <Box textAlign="center">
          <Heading>{blok.title}</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit(onSubmit)}>
            {blok.fields.map((field, index) =>
              <FormControl key={index} mt={6} isInvalid={errors[field.name]}>
              {field.type==="checkbox" && 
                <Checkbox size="md" name={field.name} variantColor="green" defaultIsChecked={field.default==="true"}>
                  {field.title}
                </Checkbox>}
              {field.type==="textarea" && 
                <>
                  <FormLabel htmlFor={field.name}>{field.title}</FormLabel>
                  <Textarea size="md" name={field.name} variantColor="green" defaultValue={field.default} placeholder={field.placeHolder} ref={register({ required: field.isRequired })}>
                  </Textarea>
                </>}
              {field.type==="select" && 
                <SimpleGrid columns={3}  spacing={10}>
                  <FormLabel htmlFor={field.name}>{field.title}</FormLabel>
                  <Select defaultValue={field.default} >
                    {field.items.map((item)=>{
                      return(<Component blok={item} key={item._uid}/>)
                    })}
                  </Select>
                </SimpleGrid>}
              {field.type==="radiogroup" && 
                <SimpleGrid columns={3}  spacing={10}>
                  <FormLabel htmlFor={field.name}>{field.title}</FormLabel>
                  <RadioGroup defaultValue={field.default} >
                    {field.items.map((item)=>{
                      return(<Component blok={item} key={item._uid}/>)
                    })}
                  </RadioGroup>
                </SimpleGrid>}
                {field.type==="checkboxgroup" && 
                <SimpleGrid columns={3}  spacing={10}>
                  <FormLabel htmlFor={field.name}>{field.title}</FormLabel>
                  <CheckboxGroup defaultValue={field.default} >
                    {field.items.map((item)=>{
                      return(<Component blok={item} key={item._uid}/>)
                    })}
                  </CheckboxGroup>
                </SimpleGrid>}
              {field.type!=="checkbox" && 
                field.type!=="textarea" && 
                field.type!=="radiogroup" && 
                field.type!=="checkboxgroup" &&  
                field.type!=="select" &&  
                <>
                  <FormLabel htmlFor={field.name}>{field.title}</FormLabel>
                  <Input type={field.type} name={field.name} placeholder={field.placeHolder} defaultValue={field.default} ref={register({ required: field.isRequired })}/>
                  <FormErrorMessage>
                    {errors[field.name] && errors[field.name].message}
                  </FormErrorMessage>
                </>}
              </FormControl>                      
            )}
            {status === "SUCCESS" ? <Text>{blok.successMessage}</Text> : <><Button type="submit" mt={4} bg="teal.500"
      isLoading={formState.isSubmitting}>{blok.primaryAction}</Button></>}
                  {status === "ERROR" && <Text>{blok.errorMessage}</Text>}

                  <Button type="button" ml={4} mt={4} bg="blue.500" isLoading={formState.isSubmitting} onClick={reset}>Reset</Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}