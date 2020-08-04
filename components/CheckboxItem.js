import React from "react";
import SbEditable from 'storyblok-react'
import { Checkbox } from "@chakra-ui/core"

const CheckboxItem = ({blok}) => {
    return (
    <SbEditable content={blok}>      
      <input type="checkbox" checked={blok.value} name={blok.name}/>
    </SbEditable>
  )
}

export default CheckboxItem