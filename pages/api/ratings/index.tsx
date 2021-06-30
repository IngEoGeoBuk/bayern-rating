import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../../utils/dbConnect";
import { Rating } from '../../../models/Rating.js';
import { ModelRatingType } from '../../../types'

interface DataType {
    data?: ModelRatingType[]
    success: boolean,
}

dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse<DataType> ) => {
    const { method } = req;

    switch(method) {
        // 전체 별점 리스트 불러오기
        case 'GET':
            try {
                const ratings = await Rating.find({});
                res.status(200).json({ success: true, data: ratings })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default: 
            res.status(400).json({ success: false });
            break;
    }
}
