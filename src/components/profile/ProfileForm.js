import React, { useEffect, useContext, useState } from 'react';
import { ProfileContext } from './ProfileProvider';
import { UserContext } from '../auth/UserProvider';
import { storage } from '../firebaseConfig';

export const ProfileForm = (props) => {
  const { languages, getLanguages, createProfile } = useContext(ProfileContext);
  const { user, updateUser, getUserById } = useContext(UserContext);
  const [projectUrl, setProjectUrl] = useState(false);
  const [projectImage, setProjectImage] = useState(null);
  const [profileUrl, setProfileUrl] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [currentProfile, setCurrentProfile] = useState({
    user: '',
    gitHubUser: '',
    profileImg: '',
    projectName: '',
    projectDetail: '',
    projectImg: '',
    bio: '',
    techEd: '',
    languages: [],
  });

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    getUserById(userId);
  }, []);

  useEffect(() => {
    getLanguages();
  }, []);

  const handleProfileImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setProfileUrl(false);
    setProfileImage(file);
  };

  const profileImgUpload = (e) => {
    e.preventDefault();
    const newProfileState = Object.assign({}, currentProfile);
    const storageRef = storage.ref(`profile/${profileImage.name}`);
    storageRef.put(projectImage).then((snapshot) => {
      storageRef.getDownloadURL()
        .then((url) => {
          newProfileState.profileImg = url;
          setCurrentProfile(newProfileState);
          setProfileUrl(true);
        });
    });
  };

  const handleProjectImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setProjectUrl(false);
    setProjectImage(file);
  };

  const projectImgUpload = (e) => {
    e.preventDefault();
    const newProfileState = Object.assign({}, currentProfile);
    const storageRef = storage.ref(`project/${projectImage.name}`);
    storageRef.put(projectImage).then((snapshot) => {
      storageRef.getDownloadURL()
        .then((url) => {
          newProfileState.projectImg = url;
          setCurrentProfile(newProfileState);
          setProjectUrl(true);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProfile({
      user: parseInt(userId),
      profile_img: currentProfile.profileImg,
      project_name: currentProfile.projectName,
      project_detail: currentProfile.projectDetail,
      project_img: currentProfile.projectImg,
      bio: currentProfile.bio,
      github_username: currentProfile.gitHubUser,
      tech_ed: currentProfile.techEd,
      languages: currentProfile.languages.map((language) => parseInt(language)),
    }).then(() => updateUser({
      user: parseInt(userId),
      is_seeker: user.is_seeker,
      has_company: user.has_company,
      has_profile: true,
      has_listing: true,
      first_name: user.first_name,
      last_name: user.last_name,
    }))
      .then(() => props.history.push('/home'));
  };

  const handleControlledInputChange = (event) => {
    const newProfileState = Object.assign({}, currentProfile);
    const checkedLanguages = [];
    if (event.target.type !== 'checkbox') {
      newProfileState[event.target.name] = event.target.value;
    } else {
      const checkeds = document.getElementsByTagName('input');
      for (let i = 0; i < checkeds.length; i += 1) {
        if (checkeds[i].checked) {
          checkedLanguages.push(checkeds[i].value);
        }
      }
      newProfileState.languages = checkedLanguages;
    }
    setCurrentProfile(newProfileState);
  };

  const languageSelect = languages && languages.results ? languages.results.map(((language) => <div className="check__container" key={language.id}>
      <input name="languages" type="checkbox" defaultValue={language.id} className="form__input-checks" onChange={handleControlledInputChange} ></input>
      <label htmlFor={language.name} className="mb-0"><span className={language.icon}></span></label>
    </div>
  )) : '';

  return (
    <div className="profile__container">
      <h1 className="list__heading--text mbl">Create Profile</h1>
      <div className="profile__form">
        <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <div className="form__group">
            <input name="gitHubUser" type="text" className="form__input form__input-profile" placeholder="GitHub Username" onChange={handleControlledInputChange} required></input>
            <label htmlFor="gitHubUser" className="form__label">GitHub Username</label>
          </div>
          <div className="form__group">
            <div className="form__image__input">
              <input name="profileImg" type="file" className="form__input" placeholder="Profile Image" onChange={handleProfileImage} required></input>
              { profileImage && profileUrl ? <i className="far fa-check-circle"></i> : profileImage ? <i className="fas fa-upload fa-upload-red" onClick={profileImgUpload}></i> : ''}
            </div>
              <label htmlFor="profileImg" className="form__label">Profile Image</label>
          </div>
          <div className="form__group">
            <input name="projectName" type="text" className="form__input form__input-profile" placeholder="Featured Project Name" onChange={handleControlledInputChange} required></input>
            <label htmlFor="projectName" className="form__label">Featured Project Name</label>
          </div>
          <div className="form__group">
              <textarea name="projectDetail" rows="6" className="form__input form__input-profile" placeholder="Project Description (Max 300 Characters)" onChange={handleControlledInputChange} required></textarea>
              <label htmlFor="projectDetail" className="form__label">Project Description</label>
          </div>
          <div className="form__group">
            <div className="form__image__input">
              <input name="projectImg" type="file" className="form__input" placeholder="Profile Image" onChange={handleProjectImage} required></input>
              { projectImage && projectUrl ? <i className="far fa-check-circle"></i> : projectImage ? <i className="fas fa-upload fa-upload-red" onClick={projectImgUpload}></i> : ''}
            </div>
              <label htmlFor="projectImg" className="form__label">Project Screenshot</label>
          </div>
          <div className="form__group">
              <textarea name="bio" rows="6" className="form__input form__input-profile" placeholder="What do you love about coding? (Max 300 Characters)" onChange={handleControlledInputChange} required></textarea>
              <label htmlFor="bio" className="form__label">Personal Story</label>
          </div>
          <div className="form__group">
              <input name="techEd" type="text" className="form__input form__input-profile" placeholder="Technical Education" onChange={handleControlledInputChange} required></input>
              <label htmlFor="techEd" className="form__label">Technical Education</label>
          </div>
          <div className="check__group form__group">
              {languageSelect}
          </div>
          <button className="button__primary mtl" type="submit">Create Profile &rarr;</button>
        </form>
      </div>
    </div>
  );
};
