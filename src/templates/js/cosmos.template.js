function generateCosmosTemplate(COMPONENT_NAME) {
  return `
  import ${COMPONENT_NAME} from '../../${COMPONENT_NAME}';
  export default{
    component: ${COMPONENT_NAME},
    name: 'default',
    props:{
      style:{

      },
    },
  }`;
}

export default generateCosmosTemplate;
