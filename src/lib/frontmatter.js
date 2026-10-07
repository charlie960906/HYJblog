const YAML = require('yaml');

/**
 * @param {string} source
 * @returns {{ data: Record<string, unknown>, content: string }}
 */
function parseFrontMatter(source) {
  const match = /^(\uFEFF)?---[ \t]*\r?\n([\s\S]*?)\r?\n(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/.exec(source);
  if (!match) {
    return { data: {}, content: source };
  }

  const parsedData = YAML.parse(match[2]) ?? {};
  if (typeof parsedData !== 'object' || Array.isArray(parsedData)) {
    throw new TypeError('Markdown front matter must be a YAML mapping.');
  }

  return {
    data: parsedData,
    content: source.slice(match[0].length),
  };
}

module.exports = { parseFrontMatter };
