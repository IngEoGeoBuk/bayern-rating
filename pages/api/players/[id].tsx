import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../utils/dbConnect";
import { Player } from '../../../models/Player';
import { ModelPlayerType } from '../../../types'
 
interface dataTypes {
    data?: ModelPlayerType
    success: boolean,
}

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<dataTypes>) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        // 게시판 하나만 불러오기(Details)
        case 'GET':
            try {
                const player = await Player.findById(id);
                if (!player) {
                    return res.status(400).json({ success: false });
                } else {
                    res.status(200).json({ success: true, data: player })
                }
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}