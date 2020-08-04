import React from "react";
import SbEditable from 'storyblok-react'
import { Checkbox } from "@chakra-ui/core"

const CheckboxItem = ({blok}) => {
    return (
    <SbEditable content={blok}>      
      <Checkbox isChecked={blok.selected==="true"} defaultValue={blok.value} name={blok.name}>{blok.title}</Checkbox>
    </SbEditable>
  )
}

export default CheckboxItem