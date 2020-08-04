import React from "react";
import SbEditable from 'storyblok-react'
import { Checkbox } from "@chakra-ui/core"

const CheckboxItem = ({blok}) => {
    return (
    <SbEditable content={blok}>      
      <Checkbox type="checkbox"  isChecked={blok.selected==="true"} value={blok.value} name={blok.name}>{blok.title}</Checkbox>
    </SbEditable>
  )
}

export default CheckboxItem