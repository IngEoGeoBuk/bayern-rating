import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../utils/dbConnect";
import { Player } from '../../../models/Player';
import { ModelPlayerType } from '../../../types'

interface DataType {
    data?: ModelPlayerType[]
    success: boolean,
}

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<DataType>) => {
    const { method } = req;

    switch(method) {
        // 전체 선수들 리스트 불러오기
        case 'GET':
            try {
                const players = await Player.find().sort( { "no": 1 } );
                res.status(200).json({ success: true, data: players })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default: 
            res.status(400).json({ success: false });
            break;
    }
}
