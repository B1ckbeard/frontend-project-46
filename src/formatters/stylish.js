import _ from 'lodash';

const spaces_count = 4;

const getIndent = (depth) => {
  if (depth < 1) return '';
  return ' '.repeat(spaces_count * depth - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const output = Object.entries(data)
    .map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);

  return `{\n${output.join('\n')}\n${getIndent(depth)}  }`;
};

const formatDiff = (diff, depth = 1) => {
  const diffLines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'deleted':
        return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'nested':
        const inserted = formatDiff(node.children, depth + 1);
        return `${getIndent(depth)}  ${node.key}: {\n${inserted}\n${getIndent(depth)}  }`;
      case 'changed':
      return `${getIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`;
      case 'unchanged':
        return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      default:
        throw new Error((`Unknown node's type: ${node.type}`));
    }
  });
  return diffLines.join('\n');
};

export default formatDiff;
