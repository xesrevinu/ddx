/**
 * Created by kee on 15/9/25.
 */
import React, { Component, PropTypes as Types } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import cx from 'classnames';
import getTypeComponent from '../customEditor';
import Modal from '../modal';
import styles from './styles/navbar.scss';

@connect(state=>({
  auth: state.auth,
  config: state.auth.config
}))
class Navbar extends Component {
  static propTypes = {
    auth: Types.object.isRequired,
    path: Types.string.isRequired
  };
  // showEditorType 默认为配置项的第一个
  state = {
    showCreateModal: false,
    showEditorModal: false,
    showEditorType: this.props.config.menuTypes[0].type
  }
  showCreateModal() {
    this.setState({
      showCreateModal: true
    });
  }
  closeCreateModal() {
    this.setState({
      showCreateModal: false
    });
  }
  showCreateEditor() {
    this.setState({
      showEditorModal: true
    });
  }
  closeEditorModal() {
    this.setState({
      showEditorModal: false
    });
  }
  renderEditor(item) {
    this.closeCreateModal();
    this.showCreateEditor();
    this.setState({
      showEditorType: item.type
    });
  }
  renderModal() {
    const editorModal = {
      overlay: {
        backgroundColor: 'rgba(103, 109, 128, 0.73)'
      },
      content: {
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'all .5s',
        width: '600px',
        minHeight: '500px',
        padding: '0 0 20px 0',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginLeft: '-25%',
        marginTop: '-20%'
      }
    };
    const typeModal = {
      overlay: {
        backgroundColor: 'rgba(103, 109, 128, 0.73)'
      },
      content: {
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '5px',
        transition: 'all .5s',
        width: '600px',
        textAlign: 'center',
        padding: '0 0 20px 0',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginLeft: '-25%',
        marginTop: '-10%'
      }
    };
    return (
      <div>
        {this.state.showEditorModal ? (
          <Modal style={editorModal}
                 isOpen={this.state.showEditorModal}
                 onRequestClose={this.closeEditorModal.bind(this)} >
            <div >
              {getTypeComponent(this.state.showEditorType, {onClose: ()=>{
                this.closeEditorModal();
              }})}
            </div>
          </Modal>
        ) : null }
        {this.state.showCreateModal ? (
          <Modal style={typeModal}
                 isOpen={this.state.showCreateModal}
                 onRequestClose={this.closeCreateModal.bind(this)} >
            <div className={styles.types}>
              <QueueAnim>
                {this.props.config.menuTypes.map((k, i)=> {
                  const { text, type } = k;
                  return (
                    <div className={styles.type + ' ' + styles[type]}
                         key={i}
                         onClick={this.renderEditor.bind(this, k)}>
                      {text}
                    </div>
                  );
                })}
              </QueueAnim>
            </div>
          </Modal>
        ) : null }
      </div>
    );
  }
  render() {
    const show = cx({
      [styles.show]: this.props.path === '/login'
    });
    let nav = '';
    if (this.props.auth.loading) {
      nav = (
        <li key={0}>
          <a herf="#">loading</a>
        </li>
      );
    } else {
      nav = [];
      if (this.props.auth.logind) {
        nav.push(
          <li key={0}>
            <span className={styles.create} onClick={this.showCreateModal.bind(this)}> + </span>
          </li>
        );
      } else {
        nav.push(
          <li className={show} key={0}>
            <Link className={styles.login} to="/login"> 登陆</Link>
          </li>
        );
      }
    }
    return (
      <div>
    		<div className={styles.navbar}>
          <span className={styles.logo}>
            <Link to="/"> Ddx </Link>
          </span>
    			<div className={styles.left}>
            <ul>
            {nav}
            </ul>
    			</div>
    		</div>
        <div>
          {this.renderModal()}
        </div>
      </div>
		);
  }
}
export default Navbar;
