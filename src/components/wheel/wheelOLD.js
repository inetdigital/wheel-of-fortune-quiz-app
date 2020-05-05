import React from 'react';
import PropTypes from 'prop-types';

import './wheel.css';

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      spinning: false,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem() {
    if (this.state.spinning === false) {
      this.setState(
        {
          spinning: true,
        },
        () => {
          if (this.state.selectedItem === null) {
            const selectedItem = Math.floor(
              Math.random() * this.props.items.length
            );
            this.setState({ selectedItem });
            if (this.props.onSelectItem) {
              this.props.onSelectItem(selectedItem);
            }
          } else {
            this.setState({ selectedItem: null });
            setTimeout(this.selectItem, 500);
          }
        }
      );
    }
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;
    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';
    return (
      <div className="outer-container">
        <div className="wheel-container">
          <div className="controls">
            <button onClick={this.selectItem}>Spin</button>
          </div>
          <div
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={this.selectItem}
            onKeyDown={this.selectItem}
            role="button"
            tabIndex={0}
          >
            {Object.keys(items).map((item, index) => (
              <div
                className={`wheel-item item-${index}`}
                key={index}
                style={{ '--item-nb': index }}
              >
                {items[index].name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Wheel.propTypes = {
  items: PropTypes.array,
  onSelectItem: PropTypes.func,
};
