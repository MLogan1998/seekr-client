import React, { useContext, useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { SeekerModal } from './SeekerModal'
import { ProfileContext } from '../profile/ProfileProvider';

export const EmployerSwipe = (props) => {
  const { profiles, getProfiles, getGitHubData,} = useContext(ProfileContext)
  const [ modalShow, setModalShow ] = useState(false)

  useEffect(() => {
    getProfiles()
  }, [])

  const handleModalShow = (profileId) => {
    if (profiles && profiles.results) {
      const profile = profiles.results.find(({id}) => id === profileId)
      getGitHubData(profile.github_username)
      profile.modalShow = true;
      setModalShow(profile.modalShow)
    }
  }

  const handleModalClose = (profileId) => {
    if (profiles && profiles.results) {
      const profile = profiles.results.find(({id}) => id === profileId)
      profile.modalShow = false;
      setModalShow(profile.modalShow)
    }
  }

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
            profiles && profiles.results ? 
                
                profiles.results.map((profile => 
                  
                  <TinderCard className="swipeCard" key={profile.id} preventSwipe={['up', 'down']} onSwipe={onSwipe}>
                    <div id="card" className="swipeCard__content">
                      <div className="swipeCard__content--img" style={{backgroundImage: `url(${profile.project_img})`}}></div>
                    
                    <div className="project__info">
                      <div className="project__info--circle" onClick={() => handleModalShow(profile.id)}><i class="fas fa-info"></i></div>
                      <h3 className="project__info--name">{profile.project_name}</h3>
                      <p className="project__info--description">{profile.project_detail}</p>
                    </div>
                    <SeekerModal key={profile.id} handleModalShow={handleModalShow} handleModalClose={handleModalClose} modalShow={profile.modalShow} profile={profile} />
                    </div>
                  </TinderCard>
                ))            
            : ''
         
          }
          </div>
    </div>
  )
}
