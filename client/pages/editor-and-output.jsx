import React, { Component } from 'react';
import EditorContainer from '../components/editor-container';

import TabNavBar from '../components/tab-nav';

const editorLabels = ['HTML', 'CSS', 'JAVASCRIPT'];
const bottomNavButtons = ['RUN', 'PROJECTS', 'SAVE'];

export default class EditorAndOutput extends Component {
  render() {
    return (
      <>
        <div className="container row">
          <div className="col-8">
            <EditorContainer editorLabels={editorLabels} />
          </div>
          <div className="col-4">
            <div className="tab">Project Name</div>
            <iframe srcDoc="<h1>Hello, World!</h1> <style>body { background-color: red }</style>" className="output"></iframe>
          </div>
        </div>
        <TabNavBar buttons={bottomNavButtons} position="fixed-bottom" />
      </>
    );
  }
}
