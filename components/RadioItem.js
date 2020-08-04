import SbEditable from 'storyblok-react'
import { Radio } from "@chakra-ui/core"
const RadioItem = ({blok}) => {
    return (
    <SbEditable content={blok}>      
        <Radio type="checkbox" isChecked={blok.selected==="true"} value={blok.value} name={blok.name}>{blok.title}</Radio>
    </SbEditable>
  )
}

export default RadioItem