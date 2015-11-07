import React from 'react';

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
 * @param  {Array} components
 * @return {Function}
 */
function getTypeComponent(components) {
  return (type, props)=>{
    const custom = components[type];
    if (!custom) {
      return console.warn(`自定义组件${type}不存在`);
    }
    return isReactComponent(custom) ? (
      React.createElement(custom, props)
    ) : custom(props);
  };
}

export {
  getTypeComponent
};
