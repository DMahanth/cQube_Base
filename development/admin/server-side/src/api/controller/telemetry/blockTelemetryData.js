const router = require('express').Router();
const { logger } = require('../../lib/logger');
const auth = require('../../middleware/check-auth');
var const_data = require('../../lib/config');

router.post('/all_Block', async (req, res) => {
    try {
        logger.info('--- get telemetry data api ---');
        let year = req.body.year
        let month = req.body.month
        let date = req.body.date
        console.log(req.body);
        const_data['getParams']['Key'] = `cqube_telemetry/2020-08-12/block_telemetry_2020_8_11_19.json`
        const_data['s3'].getObject(const_data['getParams'], async function (err, data) {
            if (err) {
                logger.error(err);
                res.status(500).json({ errMsg: "Something went wrong" });
            } else if (!data) {
                logger.error("No data found in s3 file");
                res.status(403).json({ errMsg: "No such data found" });
            } else {
                logger.info('--- get telemetry data api response sent ---');
                res.send(JSON.parse(data.Body));
            }
        })
    } catch (e) {
        logger.error(`Error :: ${e}`);
        res.status(500).json({ errMsg: "Internal error. Please try again!!" });
    }
})

module.exports = router