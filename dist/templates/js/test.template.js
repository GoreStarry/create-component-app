"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function generateTestTemplate(COMPONENT_NAME) {
  return `import React from 'react'
import { shallow } from 'enzyme'

import ${COMPONENT_NAME} from '../${COMPONENT_NAME}'

describe('${COMPONENT_NAME}', () => {
  let component, props

  beforeEach(() => {
    props = {}
    component = shallow(<${COMPONENT_NAME} {...props} />)
  })

  it('should', () => {
    expect(component).toMatchSnapshot()
  })
})`;
}

exports.default = generateTestTemplate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvanMvdGVzdC50ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZVRlc3RUZW1wbGF0ZSIsIkNPTVBPTkVOVF9OQU1FIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLG9CQUFULENBQThCQyxjQUE5QixFQUE4QztBQUM1QyxTQUFROzs7U0FHREEsY0FBZSxhQUFZQSxjQUFlOztZQUV2Q0EsY0FBZTs7Ozs7MkJBS0FBLGNBQWU7Ozs7OztHQVZ4QztBQWlCRDs7a0JBRWNELG9CIiwiZmlsZSI6InRlc3QudGVtcGxhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZW5lcmF0ZVRlc3RUZW1wbGF0ZShDT01QT05FTlRfTkFNRSkge1xuICByZXR1cm4gYGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHNoYWxsb3cgfSBmcm9tICdlbnp5bWUnXG5cbmltcG9ydCAke0NPTVBPTkVOVF9OQU1FfSBmcm9tICcuLi8ke0NPTVBPTkVOVF9OQU1FfSdcblxuZGVzY3JpYmUoJyR7Q09NUE9ORU5UX05BTUV9JywgKCkgPT4ge1xuICBsZXQgY29tcG9uZW50LCBwcm9wc1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHByb3BzID0ge31cbiAgICBjb21wb25lbnQgPSBzaGFsbG93KDwke0NPTVBPTkVOVF9OQU1FfSB7Li4ucHJvcHN9IC8+KVxuICB9KVxuXG4gIGl0KCdzaG91bGQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGNvbXBvbmVudCkudG9NYXRjaFNuYXBzaG90KClcbiAgfSlcbn0pYFxufVxuXG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVRlc3RUZW1wbGF0ZVxuIl19