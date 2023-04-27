import { list, shortList, longList } from './data'
import { FaQuoteRight } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useState, useEffect } from 'react'

const Carousel = () => {
  const [people, setPeople] = useState(longList)
  const [currentPerson, setCurrentPerson] = useState(0)

  const prevSlide = () => {
    setCurrentPerson(oldPerson => {
      const result = (oldPerson - 1 + people.length) % people.length //* This code simply means that if the current person is the first person in the list, then the previous person will be the last person in the list. */
      return result
    })
  }

  const nextSlide = () => {
    setCurrentPerson(oldPerson => {
      //* This 'OldPerson' is the current person. */
      const result = (oldPerson + 1) % people.length //* This code simply means that if the current person is the last person in the list, then the next person will be the first person in the list. */
      return result
    })
  }

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide()
    }, 2000)

    return () => {
      clearInterval(sliderId) //* This clearInterval cleanup function is used to stop the slider from sliding when the user clicks on the next or previous button. */
    }
  }, [currentPerson]) //* This code simply means that the 'useEffect' will be triggered whenever the 'currentPerson' changes. */

  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        return (
          <article
            className='slide'
            key={id}
            style={{
              //* This code simply means that the current person will be in the center of the screen, and the others will be on the left and right side of the screen, however the others will be hidden. */
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? 'visible' : 'hidden',
            }}
            data-testid={`article-${id}`}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        )
      })}
      <button type='button' className='prev' onClick={prevSlide}>
        <FiChevronLeft />
      </button>

      <button type='button' className='next' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  )
}
export default Carousel
