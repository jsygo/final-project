import React from 'react';
import ProjectsList from './projects-list';

export default function Home(props) {
  return (
    <ProjectsList onProjectNameInput={props.onProjectNameInput} />
  );
}
