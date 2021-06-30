import type { NextApiRequest, NextApiResponse } from 'next'
import { emailTypes } from '../../../types'

export default (req: NextApiRequest, res: NextApiResponse<emailTypes>) => {
    res.statusCode = 200;
    res.json({ email: req.query.email });
}
