const fs = require('fs');
const path = require('path');

const TRANSLATION_PATH = path.join(__dirname, '../src/locales/en/translation.json');

function isWhitespace(ch) {
  return ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t';
}

function parseString(input, start) {
  let i = start + 1;
  let out = '';
  while (i < input.length) {
    const ch = input[i];
    if (ch === '"') {
      return { value: out, index: i + 1 };
    }
    if (ch === '\\') {
      const next = input[i + 1];
      if (next === 'u') {
        const hex = input.slice(i + 2, i + 6);
        if (/^[0-9a-fA-F]{4}$/.test(hex)) {
          out += String.fromCharCode(parseInt(hex, 16));
          i += 6;
          continue;
        }
      }
      const escapes = {
        '"': '"',
        '\\': '\\',
        '/': '/',
        b: '\b',
        f: '\f',
        n: '\n',
        r: '\r',
        t: '\t',
      };
      out += escapes[next] ?? next;
      i += 2;
      continue;
    }
    out += ch;
    i += 1;
  }
  throw new Error('Unterminated string');
}

function parseNumber(input, start) {
  let i = start;
  while (i < input.length && /[0-9eE+\-.]/.test(input[i])) {
    i += 1;
  }
  return { index: i };
}

function parseLiteral(input, start, literal) {
  if (input.slice(start, start + literal.length) !== literal) {
    throw new Error(`Expected ${literal}`);
  }
  return { index: start + literal.length };
}

function skipWhitespace(input, start) {
  let i = start;
  while (i < input.length && isWhitespace(input[i])) i += 1;
  return i;
}

function parseValue(input, start, path, duplicates) {
  let i = skipWhitespace(input, start);
  const ch = input[i];
  if (ch === '{') return parseObject(input, i, path, duplicates);
  if (ch === '[') return parseArray(input, i, path, duplicates);
  if (ch === '"') {
    const res = parseString(input, i);
    return { index: res.index };
  }
  if (ch === '-' || (ch >= '0' && ch <= '9')) return parseNumber(input, i);
  if (ch === 't') return parseLiteral(input, i, 'true');
  if (ch === 'f') return parseLiteral(input, i, 'false');
  if (ch === 'n') return parseLiteral(input, i, 'null');
  throw new Error(`Unexpected token at ${i}`);
}

function parseObject(input, start, path, duplicates) {
  let i = start + 1;
  const keys = new Set();
  i = skipWhitespace(input, i);
  if (input[i] === '}') return { index: i + 1 };
  while (i < input.length) {
    i = skipWhitespace(input, i);
    if (input[i] !== '"') throw new Error('Expected object key string');
    const keyRes = parseString(input, i);
    const key = keyRes.value;
    if (keys.has(key)) {
      duplicates.push(path ? `${path}.${key}` : key);
    }
    keys.add(key);
    i = skipWhitespace(input, keyRes.index);
    if (input[i] !== ':') throw new Error('Expected : after key');
    i = skipWhitespace(input, i + 1);
    const valueRes = parseValue(input, i, path ? `${path}.${key}` : key, duplicates);
    i = skipWhitespace(input, valueRes.index);
    if (input[i] === ',') {
      i += 1;
      continue;
    }
    if (input[i] === '}') return { index: i + 1 };
    throw new Error('Expected , or } in object');
  }
  throw new Error('Unterminated object');
}

function parseArray(input, start, path, duplicates) {
  let i = start + 1;
  i = skipWhitespace(input, i);
  if (input[i] === ']') return { index: i + 1 };
  while (i < input.length) {
    const valueRes = parseValue(input, i, path, duplicates);
    i = skipWhitespace(input, valueRes.index);
    if (input[i] === ',') {
      i += 1;
      continue;
    }
    if (input[i] === ']') return { index: i + 1 };
    throw new Error('Expected , or ] in array');
  }
  throw new Error('Unterminated array');
}

function main() {
  if (!fs.existsSync(TRANSLATION_PATH)) {
    console.error(`❌ Missing translation file: ${TRANSLATION_PATH}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(TRANSLATION_PATH, 'utf8');
  const duplicates = [];
  try {
    const res = parseValue(raw, 0, '', duplicates);
    const end = skipWhitespace(raw, res.index);
    if (end < raw.length) {
      throw new Error('Unexpected trailing content');
    }
  } catch (err) {
    console.error(`❌ Failed to parse translation JSON: ${err.message}`);
    process.exit(1);
  }

  if (duplicates.length) {
    const unique = Array.from(new Set(duplicates)).sort();
    console.error('❌ Duplicate translation keys found:');
    unique.forEach((k) => console.error(`  - ${k}`));
    process.exit(1);
  }

  console.log('✅ No duplicate translation keys found.');
}

main();
