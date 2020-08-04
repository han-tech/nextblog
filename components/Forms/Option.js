import React from "react";
import SbEditable from 'storyblok-react'
const Option = ({blok}) => {
    return (
    <SbEditable content={blok}>      
      <option value={blok.value} name={blok.name}>{blok.title}</option>
    </SbEditable>
  )
}

export default Option