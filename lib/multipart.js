// Minimal multipart/form-data parser (no external dependencies).
function parseMultipart(buffer, contentType) {
  const match = /boundary=(?:"([^"]+)"|([^;]+))/i.exec(contentType || '');
  if (!match) return { fields: {}, files: [] };
  const boundary = '--' + (match[1] || match[2]).trim();
  const boundaryBuf = Buffer.from(boundary);
  const parts = [];
  let start = buffer.indexOf(boundaryBuf);
  while (start !== -1) {
    const next = buffer.indexOf(boundaryBuf, start + boundaryBuf.length);
    if (next === -1) break;
    let chunk = buffer.slice(start + boundaryBuf.length, next);
    // strip leading CRLF and trailing CRLF
    if (chunk.slice(0, 2).toString() === '\r\n') chunk = chunk.slice(2);
    if (chunk.slice(-2).toString() === '\r\n') chunk = chunk.slice(0, -2);
    if (chunk.length > 0 && chunk.toString() !== '--') parts.push(chunk);
    start = next;
  }

  const fields = {};
  const files = [];

  for (const part of parts) {
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) continue;
    const headerStr = part.slice(0, headerEnd).toString('utf-8');
    const body = part.slice(headerEnd + 4);

    const nameMatch = /name="([^"]+)"/.exec(headerStr);
    const fileNameMatch = /filename="([^"]*)"/.exec(headerStr);
    const typeMatch = /Content-Type:\s*([^\r\n]+)/i.exec(headerStr);
    const fieldName = nameMatch ? nameMatch[1] : null;
    if (!fieldName) continue;

    if (fileNameMatch && fileNameMatch[1]) {
      files.push({
        field: fieldName,
        filename: fileNameMatch[1],
        mimetype: typeMatch ? typeMatch[1].trim() : 'application/octet-stream',
        data: body
      });
    } else {
      fields[fieldName] = body.toString('utf-8');
    }
  }

  return { fields, files };
}

module.exports = { parseMultipart };
