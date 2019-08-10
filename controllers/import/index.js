const { verifySpeedLevelRunChecksum } = require('./helper');

exports.handleImport = (req, res) => {
  try {
    const base64 = Buffer.from(req.body.import, 'base64').toString();
    const json = JSON.parse(base64);
    console.log(verifySpeedLevelRunChecksum(json));
    res.json(json);
  } catch (e) {
    res.json({ error: 'Parsing error - invalid export string' });
  }
};
