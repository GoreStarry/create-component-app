'use strict';

const mockClassTemplate = jest.fn();
const mockFunctionalTemplate = jest.fn();
const mockTestTemplate = jest.fn();
const mockStorybookTemplate = jest.fn();
const mockIndexTemplate = jest.fn();
const mockStyleTemplate = jest.fn();

jest.mock('../js/class.template', () => mockClassTemplate).mock('../js/functional.template', () => mockFunctionalTemplate).mock('../js/test.template', () => mockTestTemplate).mock('../js/storybook.template', () => mockStorybookTemplate).mock('../js/index.template', () => mockIndexTemplate).mock('../css/style.template', () => mockStyleTemplate);

var _require = require('../index');

const generateComponentTemplate = _require.generateComponentTemplate,
      generateStyleFile = _require.generateStyleFile,
      generateIndexFile = _require.generateIndexFile,
      generateTestTemplate = _require.generateTestTemplate,
      generateStorybookTemplate = _require.generateStorybookTemplate;


describe('Template index', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('should call class.template when class is passed into generateComponentTemplate', () => {
    generateComponentTemplate('class', 'test');
    expect(mockClassTemplate).toHaveBeenCalledWith('test', 'class', {});
  });

  it('should call pure.template when pure is passed into generateComponentTemplate', () => {
    generateComponentTemplate('pure', 'test');
    expect(mockClassTemplate).toHaveBeenCalledWith('test', 'pure', {});
  });

  it('should call functional.template when stateless is passed into generateComponentTemplate', () => {
    generateComponentTemplate('stateless', 'test');
    expect(mockFunctionalTemplate).toHaveBeenCalledWith('test', 'stateless', {});
  });

  it('should export generateIndexFile with correct module', () => {
    generateIndexFile();
    expect(mockIndexTemplate).toHaveBeenCalled();
  });

  it('should export generateTestTemplate with correct module', () => {
    generateTestTemplate();
    expect(mockTestTemplate).toHaveBeenCalled();
  });

  it('should export generateStorybookTemplate with correct module', () => {
    generateStorybookTemplate();
    expect(mockStorybookTemplate).toHaveBeenCalled();
  });

  it('should export generateStyleFile with correct module', () => {
    generateStyleFile();
    expect(mockStyleTemplate).toHaveBeenCalled();
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZW1wbGF0ZXMvX190ZXN0c19fL2luZGV4LnRlc3QuanMiXSwibmFtZXMiOlsibW9ja0NsYXNzVGVtcGxhdGUiLCJqZXN0IiwiZm4iLCJtb2NrRnVuY3Rpb25hbFRlbXBsYXRlIiwibW9ja1Rlc3RUZW1wbGF0ZSIsIm1vY2tTdG9yeWJvb2tUZW1wbGF0ZSIsIm1vY2tJbmRleFRlbXBsYXRlIiwibW9ja1N0eWxlVGVtcGxhdGUiLCJtb2NrIiwicmVxdWlyZSIsImdlbmVyYXRlQ29tcG9uZW50VGVtcGxhdGUiLCJnZW5lcmF0ZVN0eWxlRmlsZSIsImdlbmVyYXRlSW5kZXhGaWxlIiwiZ2VuZXJhdGVUZXN0VGVtcGxhdGUiLCJnZW5lcmF0ZVN0b3J5Ym9va1RlbXBsYXRlIiwiZGVzY3JpYmUiLCJhZnRlckVhY2giLCJyZXNldE1vZHVsZXMiLCJyZXNldEFsbE1vY2tzIiwiaXQiLCJleHBlY3QiLCJ0b0hhdmVCZWVuQ2FsbGVkV2l0aCIsInRvSGF2ZUJlZW5DYWxsZWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTUEsb0JBQW9CQyxLQUFLQyxFQUFMLEVBQTFCO0FBQ0EsTUFBTUMseUJBQXlCRixLQUFLQyxFQUFMLEVBQS9CO0FBQ0EsTUFBTUUsbUJBQW1CSCxLQUFLQyxFQUFMLEVBQXpCO0FBQ0EsTUFBTUcsd0JBQXdCSixLQUFLQyxFQUFMLEVBQTlCO0FBQ0EsTUFBTUksb0JBQW9CTCxLQUFLQyxFQUFMLEVBQTFCO0FBQ0EsTUFBTUssb0JBQW9CTixLQUFLQyxFQUFMLEVBQTFCOztBQUVBRCxLQUNLTyxJQURMLENBQ1Usc0JBRFYsRUFDa0MsTUFBTVIsaUJBRHhDLEVBRUtRLElBRkwsQ0FFVSwyQkFGVixFQUV1QyxNQUFNTCxzQkFGN0MsRUFHS0ssSUFITCxDQUdVLHFCQUhWLEVBR2lDLE1BQU1KLGdCQUh2QyxFQUlLSSxJQUpMLENBSVUsMEJBSlYsRUFJc0MsTUFBTUgscUJBSjVDLEVBS0tHLElBTEwsQ0FLVSxzQkFMVixFQUtrQyxNQUFNRixpQkFMeEMsRUFNS0UsSUFOTCxDQU1VLHVCQU5WLEVBTW1DLE1BQU1ELGlCQU56Qzs7ZUFjSUUsUUFBUSxVQUFSLEM7O01BTEFDLHlCLFlBQUFBLHlCO01BQ0FDLGlCLFlBQUFBLGlCO01BQ0FDLGlCLFlBQUFBLGlCO01BQ0FDLG9CLFlBQUFBLG9CO01BQ0FDLHlCLFlBQUFBLHlCOzs7QUFHSkMsU0FBUyxnQkFBVCxFQUEyQixNQUFNO0FBQy9CQyxZQUFVLE1BQU07QUFDZGYsU0FBS2dCLFlBQUw7QUFDQWhCLFNBQUtpQixhQUFMO0FBQ0QsR0FIRDs7QUFLQUMsS0FBRyxnRkFBSCxFQUFxRixNQUFNO0FBQ3pGVCw4QkFBMEIsT0FBMUIsRUFBbUMsTUFBbkM7QUFDQVUsV0FBT3BCLGlCQUFQLEVBQTBCcUIsb0JBQTFCLENBQStDLE1BQS9DLEVBQXVELE9BQXZELEVBQWdFLEVBQWhFO0FBQ0QsR0FIRDs7QUFLQUYsS0FBRyw4RUFBSCxFQUFtRixNQUFNO0FBQ3ZGVCw4QkFBMEIsTUFBMUIsRUFBa0MsTUFBbEM7QUFDQVUsV0FBT3BCLGlCQUFQLEVBQTBCcUIsb0JBQTFCLENBQStDLE1BQS9DLEVBQXVELE1BQXZELEVBQStELEVBQS9EO0FBQ0QsR0FIRDs7QUFLQUYsS0FBRyx5RkFBSCxFQUE4RixNQUFNO0FBQ2xHVCw4QkFBMEIsV0FBMUIsRUFBdUMsTUFBdkM7QUFDQVUsV0FBT2pCLHNCQUFQLEVBQStCa0Isb0JBQS9CLENBQW9ELE1BQXBELEVBQTRELFdBQTVELEVBQXlFLEVBQXpFO0FBQ0QsR0FIRDs7QUFLQUYsS0FBRyxxREFBSCxFQUEwRCxNQUFNO0FBQzlEUDtBQUNBUSxXQUFPZCxpQkFBUCxFQUEwQmdCLGdCQUExQjtBQUNELEdBSEQ7O0FBS0FILEtBQUcsd0RBQUgsRUFBNkQsTUFBTTtBQUNqRU47QUFDQU8sV0FBT2hCLGdCQUFQLEVBQXlCa0IsZ0JBQXpCO0FBQ0QsR0FIRDs7QUFLQUgsS0FBRyw2REFBSCxFQUFrRSxNQUFNO0FBQ3RFTDtBQUNBTSxXQUFPZixxQkFBUCxFQUE4QmlCLGdCQUE5QjtBQUNELEdBSEQ7O0FBS0FILEtBQUcscURBQUgsRUFBMEQsTUFBTTtBQUM5RFI7QUFDQVMsV0FBT2IsaUJBQVAsRUFBMEJlLGdCQUExQjtBQUNELEdBSEQ7QUFJRCxDQXhDRCIsImZpbGUiOiJpbmRleC50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbW9ja0NsYXNzVGVtcGxhdGUgPSBqZXN0LmZuKClcbmNvbnN0IG1vY2tGdW5jdGlvbmFsVGVtcGxhdGUgPSBqZXN0LmZuKClcbmNvbnN0IG1vY2tUZXN0VGVtcGxhdGUgPSBqZXN0LmZuKClcbmNvbnN0IG1vY2tTdG9yeWJvb2tUZW1wbGF0ZSA9IGplc3QuZm4oKVxuY29uc3QgbW9ja0luZGV4VGVtcGxhdGUgPSBqZXN0LmZuKClcbmNvbnN0IG1vY2tTdHlsZVRlbXBsYXRlID0gamVzdC5mbigpXG5cbmplc3RcbiAgICAubW9jaygnLi4vanMvY2xhc3MudGVtcGxhdGUnLCAoKSA9PiBtb2NrQ2xhc3NUZW1wbGF0ZSlcbiAgICAubW9jaygnLi4vanMvZnVuY3Rpb25hbC50ZW1wbGF0ZScsICgpID0+IG1vY2tGdW5jdGlvbmFsVGVtcGxhdGUpXG4gICAgLm1vY2soJy4uL2pzL3Rlc3QudGVtcGxhdGUnLCAoKSA9PiBtb2NrVGVzdFRlbXBsYXRlKVxuICAgIC5tb2NrKCcuLi9qcy9zdG9yeWJvb2sudGVtcGxhdGUnLCAoKSA9PiBtb2NrU3Rvcnlib29rVGVtcGxhdGUpXG4gICAgLm1vY2soJy4uL2pzL2luZGV4LnRlbXBsYXRlJywgKCkgPT4gbW9ja0luZGV4VGVtcGxhdGUpXG4gICAgLm1vY2soJy4uL2Nzcy9zdHlsZS50ZW1wbGF0ZScsICgpID0+IG1vY2tTdHlsZVRlbXBsYXRlKVxuXG5jb25zdCB7XG4gICAgZ2VuZXJhdGVDb21wb25lbnRUZW1wbGF0ZSxcbiAgICBnZW5lcmF0ZVN0eWxlRmlsZSxcbiAgICBnZW5lcmF0ZUluZGV4RmlsZSxcbiAgICBnZW5lcmF0ZVRlc3RUZW1wbGF0ZSxcbiAgICBnZW5lcmF0ZVN0b3J5Ym9va1RlbXBsYXRlLFxufSA9IHJlcXVpcmUoJy4uL2luZGV4JylcblxuZGVzY3JpYmUoJ1RlbXBsYXRlIGluZGV4JywgKCkgPT4ge1xuICBhZnRlckVhY2goKCkgPT4ge1xuICAgIGplc3QucmVzZXRNb2R1bGVzKClcbiAgICBqZXN0LnJlc2V0QWxsTW9ja3MoKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgY2FsbCBjbGFzcy50ZW1wbGF0ZSB3aGVuIGNsYXNzIGlzIHBhc3NlZCBpbnRvIGdlbmVyYXRlQ29tcG9uZW50VGVtcGxhdGUnLCAoKSA9PiB7XG4gICAgZ2VuZXJhdGVDb21wb25lbnRUZW1wbGF0ZSgnY2xhc3MnLCAndGVzdCcpXG4gICAgZXhwZWN0KG1vY2tDbGFzc1RlbXBsYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndGVzdCcsICdjbGFzcycsIHt9KVxuICB9KVxuXG4gIGl0KCdzaG91bGQgY2FsbCBwdXJlLnRlbXBsYXRlIHdoZW4gcHVyZSBpcyBwYXNzZWQgaW50byBnZW5lcmF0ZUNvbXBvbmVudFRlbXBsYXRlJywgKCkgPT4ge1xuICAgIGdlbmVyYXRlQ29tcG9uZW50VGVtcGxhdGUoJ3B1cmUnLCAndGVzdCcpXG4gICAgZXhwZWN0KG1vY2tDbGFzc1RlbXBsYXRlKS50b0hhdmVCZWVuQ2FsbGVkV2l0aCgndGVzdCcsICdwdXJlJywge30pXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBjYWxsIGZ1bmN0aW9uYWwudGVtcGxhdGUgd2hlbiBzdGF0ZWxlc3MgaXMgcGFzc2VkIGludG8gZ2VuZXJhdGVDb21wb25lbnRUZW1wbGF0ZScsICgpID0+IHtcbiAgICBnZW5lcmF0ZUNvbXBvbmVudFRlbXBsYXRlKCdzdGF0ZWxlc3MnLCAndGVzdCcpXG4gICAgZXhwZWN0KG1vY2tGdW5jdGlvbmFsVGVtcGxhdGUpLnRvSGF2ZUJlZW5DYWxsZWRXaXRoKCd0ZXN0JywgJ3N0YXRlbGVzcycsIHt9KVxuICB9KVxuXG4gIGl0KCdzaG91bGQgZXhwb3J0IGdlbmVyYXRlSW5kZXhGaWxlIHdpdGggY29ycmVjdCBtb2R1bGUnLCAoKSA9PiB7XG4gICAgZ2VuZXJhdGVJbmRleEZpbGUoKVxuICAgIGV4cGVjdChtb2NrSW5kZXhUZW1wbGF0ZSkudG9IYXZlQmVlbkNhbGxlZCgpXG4gIH0pXG5cbiAgaXQoJ3Nob3VsZCBleHBvcnQgZ2VuZXJhdGVUZXN0VGVtcGxhdGUgd2l0aCBjb3JyZWN0IG1vZHVsZScsICgpID0+IHtcbiAgICBnZW5lcmF0ZVRlc3RUZW1wbGF0ZSgpXG4gICAgZXhwZWN0KG1vY2tUZXN0VGVtcGxhdGUpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuICB9KVxuXG4gIGl0KCdzaG91bGQgZXhwb3J0IGdlbmVyYXRlU3Rvcnlib29rVGVtcGxhdGUgd2l0aCBjb3JyZWN0IG1vZHVsZScsICgpID0+IHtcbiAgICBnZW5lcmF0ZVN0b3J5Ym9va1RlbXBsYXRlKClcbiAgICBleHBlY3QobW9ja1N0b3J5Ym9va1RlbXBsYXRlKS50b0hhdmVCZWVuQ2FsbGVkKClcbiAgfSlcblxuICBpdCgnc2hvdWxkIGV4cG9ydCBnZW5lcmF0ZVN0eWxlRmlsZSB3aXRoIGNvcnJlY3QgbW9kdWxlJywgKCkgPT4ge1xuICAgIGdlbmVyYXRlU3R5bGVGaWxlKClcbiAgICBleHBlY3QobW9ja1N0eWxlVGVtcGxhdGUpLnRvSGF2ZUJlZW5DYWxsZWQoKVxuICB9KVxufSlcbiJdfQ==