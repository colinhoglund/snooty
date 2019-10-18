import React from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from '../components/ComponentFactory';
import Footer from '../components/Footer';
import TableOfContents from '../components/TableOfContents';
import { getNestedValue } from '../utils/get-nested-value';
import Navbar from '../components/Navbar';
import TEST_DATA from '../../tests/unit/data/Table-Of-Contents.test.json';

const Document = props => {
  const {
    addPillstrip,
    footnotes,
    pageContext: { pageMetadata, __refDocMapping },
    pillstrips,
    substitutions,
  } = props;
  const pageNodes = getNestedValue(['ast', 'children'], __refDocMapping) || [];

  return (
    <React.Fragment>
      <Navbar />
      <div className="content">
        <div id="left-column">
          <TableOfContents nodeData={TEST_DATA} />
        </div>
        <div id="main-column" className="main-column">
          <span className="showNav" id="showNav">
            Navigation
          </span>
          <div className="document">
            <div className="documentwrapper">
              <div className="bodywrapper">
                <div className="body">
                  <div className="bc" />
                  {pageNodes.map((child, index) => (
                    <ComponentFactory
                      addPillstrip={addPillstrip}
                      footnotes={footnotes}
                      key={index}
                      nodeData={child}
                      refDocMapping={__refDocMapping}
                      pageMetadata={pageMetadata}
                      pillstrips={pillstrips}
                      substitutions={substitutions}
                    />
                  ))}
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Document.propTypes = {
  addPillstrip: PropTypes.func,
  footnotes: PropTypes.objectOf(PropTypes.object),
  pageContext: PropTypes.shape({
    __refDocMapping: PropTypes.shape({
      ast: PropTypes.shape({
        children: PropTypes.array,
      }).isRequired,
    }).isRequired,
    pageMetadata: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
  pillstrips: PropTypes.objectOf(PropTypes.object),
  substitutions: PropTypes.objectOf(PropTypes.array),
};

Document.defaultProps = {
  addPillstrip: () => {},
  footnotes: {},
  pillstrips: {},
  substitutions: {},
};

export default Document;
