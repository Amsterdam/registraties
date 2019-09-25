const StyledComponent = require('styled-components');

const fixNodeUnmountedErrorInTestForStoryShots = styledComponents => {
  const secretInternals = styledComponents.__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS //eslint-disable-line
  const prevMakeTag = secretInternals.StyleSheet.prototype.makeTag;
  secretInternals.StyleSheet.prototype.makeTag = function makeTagMock(tag) {
    const newTag = tag || {};
    newTag.styleTag = newTag.styleTag || document.createElement('style');
    const { head } = document;
    if (!newTag.styleTag.parentNode) {
      head.appendChild(newTag.styleTag);
    }
    const prevMakeTagBinded = prevMakeTag.bind(this);
    return prevMakeTagBinded(newTag);
  };
};

fixNodeUnmountedErrorInTestForStoryShots(StyledComponent);

module.exports = StyledComponent;
