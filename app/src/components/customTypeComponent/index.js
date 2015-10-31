/**
 * Created by kee on 15/10/30.
 */
import React from 'react';
import image from './image';
import text from './text';
import music from './music';

const components = {
  image,
  text,
  music
};
/**
 * 判断组件是否是react的Component
 * @param  {Function}  Component 自定义组件
 * @return {Boolean}
 */
function isReactComponent(component) {
  return !!component.prototype.render;
}

/**
 * 获取对应type的组件
 * @param  {String} type
 * @param  {Object} post postSchema
 * @return {Function}
 */
function getTypeComponent(type, props) {
  let custom = components[type];
  if (!custom) {
    custom = components[text];
    console.warn(`自定义组件${type}不存在`);
  }
  return isReactComponent(custom) ? (
    React.createElement(custom, props)
  ) : custom(props);
}

export {
  components
};
export default getTypeComponent;
