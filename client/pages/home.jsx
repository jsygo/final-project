import React from 'react';
// import EditorAndOutput from './editor-and-output';
import ProjectsList from './projects-list';

export default function Home(props) {
  return (
    <ProjectsList onProjectNameInput={props.onProjectNameInput} />
    // <EditorAndOutput />
  );
}
