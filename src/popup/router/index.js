import * as React from 'react';
import * as R from 'ramda';

let stack = new Array();
let forceUpdate;

function goTo(comp, props = {}) {
  stack.push({ component: comp, props });
  forceUpdate();
}

function goBack() {
  if (stack.length) {
    stack.pop();
  }
  forceUpdate();
}

function Link({
  id,
  component,
  children,
  componentProps,
  href,
  className,
  onClick,
  ...rest
}) {
  const onClickHandler = React.useCallback(
    evt => {
      evt.preventDefault();
      if (component) {
        goTo(component, componentProps);
      }
      if (!component && href) {
        open(href);
      }
      if (typeof onClick === 'function') {
        onClick(evt);
      }
    },
    [component, componentProps, href, onClick]
  );

  const dataProps = React.useMemo(
    () => R.pickBy((_, key) => key.match('data'), rest),
    [rest]
  );

  return (
    <a
      href={href}
      className={className}
      id={id}
      onClick={onClickHandler}
      {...dataProps}>
      {children}
    </a>
  );
}
Link.defaultProps = {
  className: '',
  id: '',
  href: '',
  componentProps: {},
};

function Router({ children }) {
  const [_, setState] = React.useState(null);
  React.useEffect(() => {
    forceUpdate = () => setState({});
  });
  const { component: Component = ({ children }) => children, props } =
    stack[stack.length - 1] || {};
  return <Component {...props}>{stack.length == 0 && children}</Component>;
}

export { Router, Link, goTo, goBack };
