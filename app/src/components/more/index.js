import React, { Component, PropTypes as Types } from 'react';
import cls from 'classnames';
import styles from './styles/index.scss';
import QueueAnim from 'rc-queue-anim';

class More extends Component {
  static propTypes = {
    menus: Types.array.isRequired,
    done: Types.func.isRequired
  }
  state = {
    show: false,
    showType: 0
  }
  showPanel() {
    this.setState({
      show: !this.state.show
    });
  }
  _switchType(i) {
    const selectType = this.props.menus[i];
    this.setState({
      showType: i
    });
    this.props.done(selectType.type);
    this.showPanel();
  }
  render() {
    const menus = this.props.menus;
    const showType = menus[this.state.showType];
    const types = [];
    const show = cls({
      [styles.menus]: true
    });
    if (this.state.show ) {
      menus.map((k, i)=>{
        if (i === 0) {
          return;
        }
        types.push(
          <span key={i} onClick={this._switchType.bind(this, i)}>{k.text}</span>
        );
      });
      const reload = (
        <span key={types.length + 1}
             onClick={this._switchType.bind(this, 0)}>
          Reload
        </span>
      );
      // 将reload放到最后
      types.push(reload);
    }
    return (
      <div className={styles.menu} >
        <span className={styles.selectd} onClick={this.showPanel.bind(this)}>{showType.text}</span>
        <div className={show} >
          {this.state.show ?
            <QueueAnim leaveReverse={true}>
              {types}
            </QueueAnim>
          : null}
        </div>
      </div>
    );
  }
}

export default More;
