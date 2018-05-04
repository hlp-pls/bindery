import { addTextNode, addTextNodeIncremental } from '../addTextNode';

global.performance = { now: jest.fn() };

const pageOverflowAlways = { hasOverflowed: () => true };
const pageOverflowNever = { hasOverflowed: () => false };

// ----
//
// addTextNode

test('addTextNode cancels if page overflows', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);

  addTextNode(textNode, mockParent, pageOverflowAlways).then((result) => {
    expect(result).toBe(false);
    expect(textNode.nodeValue).toBe(testContent);
    expect(textNode.parentNode).toBeNull();
  });
});

test('addTextNode succeeds if page never overflows', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);

  addTextNode(textNode, mockParent, pageOverflowNever).then((result) => {
    expect(result).toBe(true);
    expect(textNode.nodeValue).toBe(testContent);
    expect(textNode.parentNode).toBe(mockParent);
  });
});

// ----
//
// addTextNodeIncremental

test('addTextNodeIncremental cancels if page instantly overflows', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);

  addTextNodeIncremental(textNode, mockParent, pageOverflowAlways).then((result) => {
    expect(result).toBe(false);
    expect(textNode.nodeValue).toBe(testContent);
    expect(textNode.parentNode).toBeNull();
  });
});

test('addTextNodeIncremental succeeds if content instantly fits', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);

  addTextNodeIncremental(textNode, mockParent, pageOverflowNever).then((result) => {
    expect(result).toBe(true);
    expect(textNode.nodeValue).toBe(testContent);
    expect(textNode.parentNode).toBe(mockParent);
  });
});

test('addTextNodeIncremental cancels if page overflows when not empty (ie inline block that collapses without content)', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);
  const page = { hasOverflowed: () => textNode.nodeValue !== '' };

  addTextNodeIncremental(textNode, mockParent, page).then((result) => {
    expect(result).toBe(false);
    expect(textNode.nodeValue).toBe(testContent);
    expect(textNode.parentNode).toBeNull();
  });
});

test('addTextNodeIncremental succeeds when break on word boundary', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);
  const page = { hasOverflowed: () => textNode.nodeValue.length > 4 };

  return addTextNodeIncremental(textNode, mockParent, page).then((result) => {
    expect(textNode.nodeValue).toBe('Test');
    expect(textNode.parentNode).toBe(mockParent);
    expect(result.nodeType).toBe(Node.TEXT_NODE);
    expect(result.nodeValue).toBe(' text content');
    expect(result.parentNode).toBeNull();
  });
});

test('addTextNodeIncremental backs up to word boundary', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);
  const page = { hasOverflowed: () => textNode.nodeValue.length > 7 };

  return addTextNodeIncremental(textNode, mockParent, page).then((result) => {
    expect(textNode.nodeValue).toBe('Test');
    expect(textNode.parentNode).toBe(mockParent);
    expect(result.nodeType).toBe(Node.TEXT_NODE);
    expect(result.nodeValue).toBe(' text content');
    expect(result.parentNode).toBeNull();
  });
});

test('addTextNodeIncremental cancels entirely when backing up past first word', () => {
  const testContent = 'Test text content';
  const mockParent = document.createElement('div');
  const textNode = document.createTextNode(testContent);
  const page = { hasOverflowed: () => textNode.nodeValue.length > 2 };

  return addTextNodeIncremental(textNode, mockParent, page).then((result) => {
    expect(result).toBe(false);
    expect(textNode.nodeValue).toBe(testContent);
    expect(textNode.parentNode).toBeNull();
  });
});
