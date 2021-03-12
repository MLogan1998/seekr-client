import React, { useContext, useEffect } from 'react';
import TinderCard from 'react-tinder-card';

import { EmployerContext } from '../employer/EmployerProvider';

export const SeekerSwipe = (props) => {
  const { listings, getJobListings} = useContext(EmployerContext)

  useEffect(() => {
    getJobListings()
  }, [])

  const onSwipe = (direction) => {
    if (direction == 'right') {
      console.log('Right')
    } if (direction == 'left') {
      console.log('Left')
    }
  }


  return (
    <div>
      <div className="cardContainer">
          {
            listings && listings.results ? 
                
                listings.results.map((listing => 
                  
                  <TinderCard className="swipeCard" key={listing.id} preventSwipe={['up', 'down']} onSwipe={onSwipe}>
                    <div id="card" className="swipeCard__content">
                      <div className="swipeCard__content--img" style={{backgroundImage: `url(${listing.employer.profile_img})`}}></div>
                    
                    <div className="project__info">
                      <div className="project__info--circle"><i class="fas fa-info"></i></div>
                      <h3 className="project__info--name">{listing.job_title}</h3>
                      <p className="project__info--description">{listing.job_description}</p>
                    </div>
                    </div>
                  </TinderCard>
                ))            
            : ''
         
          }
          </div>
    </div>
  )
}
