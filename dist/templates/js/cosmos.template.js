"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = generateCosmosTemplate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvY29zbW9zLnRlbXBsYXRlLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlQ29zbW9zVGVtcGxhdGUiLCJDT01QT05FTlRfTkFNRSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTQSxzQkFBVCxDQUFnQ0MsY0FBaEMsRUFBZ0Q7QUFDOUMsU0FBUTtXQUNDQSxjQUFlLGdCQUFlQSxjQUFlOztpQkFFdkNBLGNBQWU7Ozs7Ozs7SUFIOUI7QUFXRDs7a0JBRWNELHNCIiwiZmlsZSI6ImNvc21vcy50ZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdlbmVyYXRlQ29zbW9zVGVtcGxhdGUoQ09NUE9ORU5UX05BTUUpIHtcbiAgcmV0dXJuIGBcbiAgaW1wb3J0ICR7Q09NUE9ORU5UX05BTUV9IGZyb20gJy4uLy4uLyR7Q09NUE9ORU5UX05BTUV9JztcbiAgZXhwb3J0IGRlZmF1bHR7XG4gICAgY29tcG9uZW50OiAke0NPTVBPTkVOVF9OQU1FfSxcbiAgICBuYW1lOiAnZGVmYXVsdCcsXG4gICAgcHJvcHM6e1xuICAgICAgc3R5bGU6e1xuXG4gICAgICB9LFxuICAgIH0sXG4gIH1gO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZUNvc21vc1RlbXBsYXRlO1xuIl19