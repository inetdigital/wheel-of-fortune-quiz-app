import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './wheel.css';

function WheelNew(props) {
  const data = useStaticQuery(graphql`
    query QuestionsQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/categories/" } }
      ) {
        totalCount
        edges {
          node {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const [selectedItem, setSelectedItem] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const selectItem = () => {
    if (spinning === false) {
      setSpinning(true);
    }
  };

  useEffect(() => {
    if (selectedItem === null) {
      const selectedItem = Math.floor(
        Math.random() * data.allMarkdownRemark.totalCount
      );
      setSelectedItem(selectedItem);
      if (props.onSelectItem) {
        props.onSelectItem(selectedItem);
      }
    } else {
      setSelectedItem(null);
      setTimeout(selectItem, 500);
    }
  }, [spinning]);

  const wheelVars = {
    '--nb-item': data.allMarkdownRemark.totalCount,
    '--selected-item': selectedItem,
  };

  return (
    <div className="outer-container">
      <div className="wheel-container">
        <div className="controls">
          <button onClick={selectItem}>Spin</button>
        </div>
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={selectItem}
          onKeyDown={selectItem}
          role="button"
          tabIndex={0}
        >
          {data.allMarkdownRemark.edges.map((item, i) => (
            <div
              className={`wheel-item item-${i}`}
              key={i}
              style={{ '--item-nb': i }}
            >
              {item.node.frontmatter.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WheelNew;
