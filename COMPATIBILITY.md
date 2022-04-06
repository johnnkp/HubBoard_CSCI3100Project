## Compatibility
- Node.js 17.8.0 users may receive `Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.` error. Please downgrade to Node.js 17.7.2 or older.
- Security patches only available on Node.js 17.5.0 or newer. Older versions may receive `npm WARN deprecated` warnings.
- chai-http is incompatible with newer version of superagent and formidable, related `npm WARN deprecated` warnings can be ignored.
