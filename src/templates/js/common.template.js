import defaultOptions from "../../config.json";

const COMPONENT_TYPES = {
  pure: "PureComponent",
  class: "Component",
};

function generateReactImport(componentType) {
  return `import React${
    componentType !== "stateless"
      ? `, { ${COMPONENT_TYPES[componentType]} }`
      : ""
  } from 'react'`;
}

function generateComponentMethods(componentMethods) {
  if (componentMethods.length === 0) {
    return "";
  }
  let methods = "";
  componentMethods.forEach(method => {
    methods += `\n\xa0\xa0\xa0\xa0${method}(){}\n`;
  });
  return methods;
}

function generateImports(
  COMPONENT_NAME,
  componentType,
  { cssExtension = defaultOptions.cssExtension, styleFileName, cssModule }
) {
  return `${generateReactImport(componentType)}
import PropTypes from 'prop-types'
${cssModule ? "// import classNames from 'classnames/bind';" : ""}
${cssExtension ? `import styles from './${styleFileName}.${cssExtension}'` : ""}
${cssModule ? "// const cx = classNames.bind(styles);';" : ""}
`;
}

function generateClassComponent(
  COMPONENT_NAME,
  componentType,
  {
    cssExtension = defaultOptions.cssExtension,
    componentMethods = defaultOptions.componentMethods,
    cssModule,
    styleFileName,
  }
) {
  const className = cssModule
    ? `{styles.${COMPONENT_NAME}}`
    : `"${COMPONENT_NAME}"`;
  return `${generateImports(COMPONENT_NAME, componentType, {
    cssExtension,
    styleFileName,
    cssModule,
  })}

class ${COMPONENT_NAME} extends ${COMPONENT_TYPES[componentType]} {
    ${generateComponentMethods(componentMethods)}
    render() {
        return (
            <div className=${className}></div>
        );
    }
}

${COMPONENT_NAME}.propTypes = {}

${COMPONENT_NAME}.defaultProps = {}

export default ${COMPONENT_NAME}
`;
}

export { generateClassComponent, generateImports };
