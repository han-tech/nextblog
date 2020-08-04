import SbEditable from 'storyblok-react'
import { Radio } from "@chakra-ui/core"
const RadioItem = ({blok}) => {
    return (
    <SbEditable content={blok}>      
        <Radio value={blok.value}>{blok.name}</Radio>
    </SbEditable>
  )
}

export default RadioItem