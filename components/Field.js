import SbEditable from 'storyblok-react'

const Field = ({blok}) => {
  const resizedIcon = function(iconImage) {
    if (typeof iconImage !== 'undefined') {
      return iconImage.replace('//img2.storyblok.com/80x80', '//a.storyblok.com')
    }
    return null
  }

  return (
    <SbEditable content={blok}>
      <div className="feature util__flex-eq">
        <h2>{blok.name}</h2>
        <div className="feature__description">
          {blok.type}
        </div>
        <style jsx>{`
          .feature {
            text-align: center;
            padding: 30px 10px 100px;
          }

          .feature__icon {
            max-width: 80px;
          }
        `}</style>
      </div>
    </SbEditable>
  )
}

export default Field