import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { getNestedValue } from '../utils/get-nested-value';
import { isPreviewMode } from '../utils/is-preview-mode';

const Breadcrumbs = ({ parentPaths, slugTitleMapping }) => (
  <div className="bc">
    {!isPreviewMode() && parentPaths && (
      <ul>
        {parentPaths.map((path, index) => (
          <li key={path}>
            {/* TODO: Replace <a> with <Link> when back button behavior is fixed for the component.
              GitHub issue: https://github.com/gatsbyjs/gatsby/issues/8357 */}
            <a href={withPrefix(`/${path}`)}>{getNestedValue([path], slugTitleMapping)}</a>
            {index !== parentPaths.length - 1 && <span className="bcpoint"> &gt; </span>}
          </li>
        ))}
      </ul>
    )}
  </div>
);

Breadcrumbs.propTypes = {
  parentPaths: PropTypes.arrayOf(PropTypes.string),
  slugTitleMapping: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }),
};

Breadcrumbs.defaultProps = {
  parentPaths: [],
  slugTitleMapping: {},
};

export default Breadcrumbs;