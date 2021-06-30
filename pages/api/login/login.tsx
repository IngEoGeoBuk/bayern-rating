import type { NextApiRequest, NextApiResponse } from 'next'
import { emailTypes } from '../../../types'

interface dataTypes {
    email?: emailTypes
    message: string,
}

export default (req: NextApiRequest, res: NextApiResponse<dataTypes>) => {
    if(req.method === "POST") {
        const email = req.body.email;
        res.setHeader("Set-Cookie", `email=${email};Max-Age=36000;Secure`);
        res.statusCode = 200;
        res.json({ message: 'ok' });
    }
}