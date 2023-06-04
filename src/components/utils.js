import { profileName, profileJob } from './modal.js';

export let userId;

export const renderProfile = (object) => {
  profileName.textContent = object.name;
  profileJob.textContent = object.about;
  userId = object._id;
}